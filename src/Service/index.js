import Web3 from 'web3';

import QRCodeModal from '@walletconnect/qrcode-modal';

import * as walletActions from '../Actions/connectInfo';
import * as webActions from '../Actions/webInfo';
import * as provider from '../Config/web3Provider';
import NetworkInfo from '../DFMbridge/NetworkInfo';

var web3_metaMask
export const Connect = (wallet,web,update) => {
  
    console.log('connect')
    console.log('provider.connector : ' , provider.connector)
    if (window.web3) { // Connect MetaMask
        web3_metaMask = new Web3(window.web3.currentProvider);
        window.ethereum.enable().then((e) => {
            console.log(web3_metaMask)
            web3_metaMask.eth.getAccounts().then((accounts) => {
                web3_metaMask.eth.getChainId().then((chainId) => {
                    var network = "";
                    var id = 0;
                    switch(chainId) {
                        case NetworkInfo.eth_chainId :
                            network = "in Ethereum"
                            id = NetworkInfo.eth_chainId
                        break;
                        case NetworkInfo.bsc_chainId : 
                            network  = "in BinanceSmartChain"
                            id = NetworkInfo.bsc_chainId
                        break;              
                        default :
                            console.log("chainId가 없다.");
                        break;
                    }
                    let address = accounts[0]
                    update(walletActions.WALLET,{
                        type : walletActions.CONNECT_WALLET,
                        payload : 
                        {
                        connectAddress : address,
                        connect : true,
                        isWc : false,  
                        chainId : id,
                        accountNetwork : network ,
                        web3 : web3_metaMask                        }                        
                    })
                    console.log('Connect Metamask')  
                });
            });
        });

      window.ethereum.on('accountsChanged',(account) => {
        update(walletActions.WALLET,
            {
                type : walletActions.CHANGE_ADDRESS,
                payload : account[0]
            }
        )        
      });

      window.ethereum.on('chainChanged',(chainId) => {
          console.log('>>>>>>>>>>chainChanged')
        var network = "";
        var id = 0;
        switch(web3_metaMask.utils.hexToNumber(chainId)) {
          case NetworkInfo.eth_chainId: 
            network = "in Ethereum";
            id = NetworkInfo.eth_chainId
            break;
          case NetworkInfo.bsc_chainId :
            network = "in BinanaceSmartChain";
            id = NetworkInfo.bsc_chainId
            break;
          default :
            console.log("chainId가 없다.");
            break;
          }
          update(walletActions.WALLET,{
              type : walletActions.CHANGE_CHAINID, 
              payload : 
              {
                chainId : id,
                accountNetwork : network,
              }
          })
      })
    } else { // Connect WalletConnect
      if (!provider.connector.connected) {
        // create new session
        console.log('not Connected');
        provider.connector.createSession().then(() => {
          const uri = provider.connector.uri;
          QRCodeModal.open(
            uri,
            () => {
              console.log('QR Modal closed');
            },
          )
        })
      } else {
        console.log('is Connected')
        provider.connector.killSession().then( e=> {
          update(walletActions.WALLET,{
              type : walletActions.DISCONNECT_WALLET,
              payload : '',
            })
        })
      }
          // Subscribe to connection events
      provider.connector.on("connect", (error, payload) => {
        console.log("Connect Success");
        QRCodeModal.close(true);
        if (error) {
          throw error;
        }  
        // Get provided accounts and chainId
        const accounts = payload.params[0].accounts;
        const id = payload.params[0].chainId;
        var network = '';
        switch(id) {
          case NetworkInfo.eth_chainId :
            network = "in Ethereum"
            break;
          case NetworkInfo.bsc_chainId : 
            network = "in BinanceSmartChain"
            break;
          default :
            console.log("chainId가 없다.");
            break;
        }
        update(walletActions.WALLET,{
            type : walletActions.CONNECT_WALLET,
            payload : {
                connectAddress : accounts[0],
                connect : true,
                isWc : true,
                chainId : id,
                accountNetwork : network }
            }
        )
      });
  
      provider.connector.on("session_update", (error, payload) => {
        if (error) {
          throw error;
        }
        console.log("Session update")
        // Get updated accounts and chainId
        const { accounts, id } = payload.params[0];
        if(wallet.address !== accounts[0]) {
            update(walletActions.WALLET,{
                type :walletActions.CHANGE_ADDRESS,
                payload : accounts[0]
            })
        }
        var network  = ""
        switch(id) {
          case NetworkInfo.eth_chainId :
            network = "in Ethereum";
            break;
          case NetworkInfo.bsc_chainId : 
            network = "in BinanaceSmartChain";
            break;
          default :
            break;
        }
        if(wallet.chainId !== id ) {
            update(walletActions.WALLET,{
                type :walletActions.CHANGE_CHAINID,
                payload :
                {
                    chainId : id,
                    accountNetwork : network, 
                }
            })
        }
      });
  
      provider.connector.on("disconnect", (error, payload) => {
        if (error) {
          throw error;
        }
        console.log('disconnect')
        if(wallet.connect==true) {
          update(walletActions.WALLET,
            { type : walletActions.DISCONNECT_WALLET,
              payload : '', 
            });
        }   
        // Delete connector
      }); 
    }
}

export const GetDfmBalance = (wallet,web,update) => {
  console.log('GetDfmBalance : ',wallet)
    var web3
    switch(wallet.chainId) {
      case NetworkInfo.eth_chainId :        
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet        
        break;
      case NetworkInfo.bsc_chainId :
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
        break;
      default :
        return;
    }
    if(wallet.connect) {
      var token;
      if(wallet.isWC) {
        token = CheckNetwork(wallet,web,update)[0]
        web3.eth.call({
          to : token,
          data : web3.eth.abi.encodeFunctionCall({
            name: 'balanceOf',
            type: 'function',
            inputs : [{
              type: 'address',
              name: 'account'
          }]
          }, [wallet.connectAddress])
        }).then( balance => {        
          console.log(web3.utils.fromWei(web3.utils.toBN(balance),"ether"))
          update(walletActions.WALLET,
                { type :walletActions.CHANGE_BALANCE,
                  payload : web3.utils.fromWei(web3.utils.toBN(balance),"ether")+" DFM"
                })
        })
      } else {
        web3.eth.getChainId().then((chainId) => {
          switch (web3.utils.hexToNumber(chainId)) {
            case NetworkInfo.eth_chainId :
              token = NetworkInfo.eth_DFM;
              break;
            case NetworkInfo.bsc_chainId : 
              token = NetworkInfo.bsc_DFM;
              break;
            default :
              console.log("네트워크가 없다.");
          }
          web3.eth.call({
            to : token,
            data : web3.eth.abi.encodeFunctionCall({
              name: 'balanceOf',
              type: 'function',
              inputs : [{
                type: 'address',
                name: 'account'
            }]
            }, [wallet.connectAddress])
          }).then( balance => {      
            update(walletActions.WALLET,
                { type :walletActions.CHANGE_BALANCE, 
                  payload : web3.utils.fromWei(web3.utils.toBN(balance),"ether")+" DFM"
                })    
          })
          
        })
      }
    }
}

export const CheckApproval = (wallet,web,update) => {
    var network;
    var web3 
    switch(web.webChainId) {
      case NetworkInfo.eth_chainId :
        network = "Ethereum"
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet
        break;
      case NetworkInfo.bsc_chainId :
        network = "BinanceSmartChain"
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
        break;
      default :
    }
    if(wallet.chainId!==web.webChainId) {
      console.log('network', network);
      switch (web.language) {
        case 'kr' :
          alert("네트워크가 "+network+"로 연결되었는지 확인하세요.");
          break;
        case 'en' :
          alert("Check your wallet is connected to "+network+".");
          break;
        default :
      }
      return
    }
    var arr = CheckNetwork(wallet,web,update);
    var token = arr[0];
    var bridge = arr[1];
    web3.eth.call({
      to : token,
      data : web3.eth.abi.encodeFunctionCall({
        name: 'allowance',
        type: 'function',
        inputs: [{
            type: 'address',
            name: 'owner'
        },{
            type: 'address',
            name: 'spender'
        }]
    }, [wallet.connectAddress, bridge])
    }).then(approval => {

      if (web3.utils.toBN(approval).cmp(web3.utils.toBN(web3.utils.toWei(web.amount.toString(),'ether'))) == 1) {
          update(webActions.WEB,
                { type : webActions.CHANGE_APPROVAL, 
                  payload : true,
                })
      } else {
        update(webActions.WEB,
          { type : webActions.CHANGE_APPROVAL, 
            payload : false,
          })
      }
    });
  }

 export const GetFee = (wallet,web,update) => {
    var bridge;
    var web3;
    console.log('GetFee Wallet : ' , web)
    console.log('chainId : ' , NetworkInfo.eth_chainId)
    switch(web.webChainId) {
      case NetworkInfo.eth_chainId :
        bridge = NetworkInfo.eth_bridge;
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet
        console.log('web3ETH')
        break;
      case NetworkInfo.bsc_chainId :
        bridge = NetworkInfo.bsc_bridge;
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
        console.log('web3BSC')
        break;
      default :
    }
    web3.eth.call({
      to : bridge,
      data : web3.eth.abi.encodeFunctionCall({
        name: 'viewFee',
        type: 'function',
        inputs : []
      }, [])
    }).then( status => {
      // console.log(status)
      if(web3.utils.fromWei(web3.utils.toBN(status),'ether') !== web.fee) {
          update(webActions.WEB,
            {   type : webActions.SET_FEE,
                payload : web3.utils.fromWei(web3.utils.toBN(status),'ether')
            })        
      }
    })
  }

  export const CheckNetwork = (wallet,web,update) => {
    var token = "";
    var bridge = "";
    switch(wallet.chainId) {
      case NetworkInfo.eth_chainId :
        token = NetworkInfo.eth_DFM;
        bridge = NetworkInfo.eth_bridge;        
      break;
      case NetworkInfo.bsc_chainId :
        token = NetworkInfo.bsc_DFM;
        bridge = NetworkInfo.bsc_bridge;        
      break;        
      default :
        console.log("네트워크 가 없다.");
    }
    return [token,bridge];
  }

  export const SetNetwork = ( wallet,web,update,id ) => {
    try {
      let prev = document.getElementById(web.clickBtnId);
      prev.className = "button";    
      let current = document.getElementById(id);
      console.log(id);
      current.className = "buttonClick";
    } catch (error) { }

    switch (id) {
      case "ethToBsc" :
        update(webActions.WEB, { 
            type : webActions.CHANGE_NETWORK,
            payload : { 
              from       : "ETH",
              to         : "BSC",
              btnId      : id,
              webChainId : NetworkInfo.eth_chainId 
            }
        });
        break;
      case "bscToEth" :
        update(webActions.WEB, { 
          type : webActions.CHANGE_NETWORK,
          payload : { 
            from       : "BSC",
            to         : "ETH",
            btnId      : id,
            webChainId : NetworkInfo.bsc_chainId 
          }
        });
        break;
      case "bscToSol" :
        update(webActions.WEB, { 
          type : webActions.CHANGE_NETWORK,
          payload : { 
            from       : "BSC",
            to         : "SOL",
            btnId      : id,
            webChainId : NetworkInfo.bsc_chainId
          }
        });
        break;
      case "ethToSol" :
        update(webActions.WEB, { 
          type : webActions.CHANGE_NETWORK,
          payload : { 
            from       : "ETH",
            to         : "SOL",
            btnId      : id,
            webChainId : NetworkInfo.eth_chainId
          }
        });
        break;
      default :
        console.log("네트워크 세팅을 하지 않음.");
    }
  }

  export const CheckBaseFee = (wallet,web,update) => {
    let web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url));
    web3.eth.getBlock('latest').then((block) => {
       let baseFee = web3.utils.fromWei(web3.utils.toBN(block.baseFeePerGas),'Gwei')
       if(baseFee>80) {
        switch(web.language) {
          case 'kr' :
            alert('가스 가격이 너무 높아 현재 스왑 하실 수 없습니다. 스왑 요청 시 가스 가격이 낮아질 때까지 요청은 대기 상태에 머무르게 됩니다.')
            break;
          case 'en' :
            alert("GAS price is currently too high to swap.");
            break;
        }
         return;
       }
    })
  }