import * as webActions from '../Actions/webInfo';
import NetworkInfo from '../DFMbridge/NetworkInfo';
import Web3 from 'web3';
import BridgeContract from "../DFMbridge/BridgeABI";
import DFMContract from "../DFMbridge/DFMABI";
import * as provider from '../Config/web3Provider';
import * as service from '../Service';


const delay = ms => new Promise(res => setTimeout(res, ms));


export const GetReceipt = async (wallet,web,update,type,net,hash) => {
    var web3;
    switch(wallet.chainId) {
      case NetworkInfo.eth_chainId :
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet
        break;
      case NetworkInfo.bsc_chainId :
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
        break;
      default :
    }
    if(type===1) {
        update(webActions.WEB,
            { type : webActions.OPEN_SWAP,
              payload : 
              { 
                swapMonitor : true,
                swapPercent : 20  
              }
        });
    }
    console.log('>>>>>>>>>>>>>>> hash : ',hash);
    var pending = false;
    while(!pending) {
      await delay(5000);
      const receipt = await web3.eth.getTransactionReceipt(hash);
      console.log('receipt : ' , receipt);
      if ( receipt !== null && receipt.status=== true) {
        if(type===1) {
          console.log('type : ' , type);
          console.log('net : ' , net);
          var web3_bsc
          var web3_eth
          switch(net) {
            case 0 :
              web3_bsc = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
              web3_bsc.eth.getBlockNumber().then((blockNum) => {
                console.log("blockNum : " , blockNum);
                SwapMonitoring(wallet,web,update,net,blockNum)
                update(webActions.WEB,
                    { type : webActions.CHANGE_SWAPPERCENT, 
                      payload : 50
                    });
              })
              break;
            case 1 :
              console.log("if net 1")
              web3_eth = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet
              web3_eth.eth.getBlockNumber().then((blockNum) => {
                SwapMonitoring(wallet,web,update,net,blockNum)
                update(webActions.WEB,
                    { type : webActions.CHANGE_SWAPPERCENT, 
                      payload : 50
                    });
              })
              break;
          }
        } else {
          console.log("else type")
          service.CheckApproval(wallet,web,update);
        }
        return receipt;
      } else if ( receipt !== null &&receipt.status===false) {
        console.log("tx Fail!");
        switch(web.lan) {
          case 'kr' :
            alert("트랜잭션 실패!")
            break;
          case 'en' :
            alert("Transaction failed!")
            break;
          default :
        }
        update(webActions.WEB,
            { type : webActions.OPEN_SWAP, 
              payload : {
                  swapMonitor : false,
                  swapPercent : 0,
              }
            });
        return receipt;
      }
       else{
        console.log("Tx pending...");
      }
    }    
}

export const SendTx = (wallet,web,update,type,net,tx) => {
    console.log('>>>>>>>>>>>>>>> SendTx wallet : ' , wallet)
    if(wallet.chainId !== web.webChainId) {
      var network;
      switch(web.webChainId) {
        case NetworkInfo.eth_chainId :
          network = "Ethereum"
          break;
        case NetworkInfo.bsc_chainId :
          network = "BinanceSmartChain"
          break;
        default :
      }
      switch (web.lan) {
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
  // Send transaction
    if(wallet.isWc) {
      provider.connector
      .sendTransaction(tx)
      .then((result) => {
        switch(wallet.chainId) {
          case NetworkInfo.eth_chainId :
              update(webActions.WEB, 
                { type : webActions.OPEN_PENDING, 
                  payload : {
                    pending : true,
                    scanUrl : NetworkInfo.eth_scan+result,
                    urlLinkTxt : "view on Etherscan", 
                    }
              })
        break;
        case NetworkInfo.bsc_chainId : 
            update(webActions.WEB, 
                { type : webActions.OPEN_PENDING, 
                  payload : {
                    pending : true,
                    scanUrl : NetworkInfo.bsc_scan+result,
                    urlLinkTxt : "view on BSCscan", 
                    }
            })
          break;
        }
        console.log('txHash : ' , result)
        // Returns transaction id (hash)

        GetReceipt(wallet,web,update,type,net,result).then( (e) => {
          console.log(e);
          update(webActions.WEB, 
            { type : webActions.OPEN_PENDING, 
              payload : {
                pending : false,
                scanUrl : '',
                urlLinkTxt : '', 
                }
        })
        }); 
      }).catch((error) => {
        // Error returned when rejected
        console.error(error);
      });
    } else {
      console.log(tx)
      console.log(wallet.web3);
      let web3_metaMask = wallet.web3;
      web3_metaMask.eth.sendTransaction({  from : tx.from,
                                 to : tx.to,
                                  data : tx.data
      }).on('transactionHash', (hash) => {
        console.log(hash);
        switch(wallet.chainId) {
          case NetworkInfo.eth_chainId  :
            update(webActions.WEB, 
                { type : webActions.OPEN_PENDING, 
                  payload : {
                    pending : true,
                    scanUrl : NetworkInfo.eth_scan+hash,
                    urlLinkTxt : "view on Etherscan", 
                    }
            })
            break;
        case NetworkInfo.bsc_chainId :
            update(webActions.WEB, 
                { type : webActions.OPEN_PENDING, 
                  payload : {
                    pending : true,
                    scanUrl : NetworkInfo.bsc_scan+hash,
                    urlLinkTxt : "view on BSCscan", 
                    }
            })
            break;
          default :
        }
        GetReceipt(wallet,web,update,type,net,hash).then( (e) => {
          console.log(e);
          update(webActions.WEB, 
            { type : webActions.OPEN_PENDING, 
              payload : {
                pending : false,
                scanUrl : '',
                urlLinkTxt : '', 
                }
        })
        }); 
      });
    }
  }

 export const SwapMonitoring = async (wallet,web,update,net,blockNum) => {

    switch (net) {
      case 0 : //eth To bsc
        MonitroingEthToBsc(wallet,web,update,blockNum);
      break; 
      case 1 :// bsc To eth
        MonitroingBscToEth(wallet,web,update,blockNum);
        break;
      default :

  }
}

export const MonitroingEthToBsc = async (wallet,web,update,blockNum) => {
  // 0 eth -> bsc
  // 1 bsc -> eth
  // 2 rink -> test
  // 3 test -> rink
  

  let web3_bsc = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
  let DFM = new web3_bsc.eth.Contract(DFMContract.abi,NetworkInfo.bsc_DFM);
  
  
  var ing = true;
    while(ing) {
      DFM.getPastEvents('Transfer',{filter:{from:'0x0000000000000000000000000000000000000000'},fromBlock:blockNum-1,toBlock:'latest'},function(error,mintEvents) {
        console.error("error : ", error);
        console.log("mint events : " , mintEvents);
        if (mintEvents.length != 0) {
          console.log("mintEvent not 0");
        }
      }).then((events) => {
        if(events.length !== 0 ) {
          ing = false;
          update(webActions.WEB,{ type : webActions.CHANGE_SWAPPERCENT, payload : 100 });
          switch(web.language) {
            case 'kr' :
              alert("스왑 완료.")
              break;
            case 'en' :
              alert("Swap succeeded.")
              break;
            default :
          }
        }
      });                 
      await delay(5000);
    }              
    update(webActions.WEB, 
        { type :webActions.OPEN_SWAP, 
          payload : { 
            swapMonitor : false,
            swapPercent : 0 
          }
    });
}

export const MonitroingBscToEth = async (wallet,web,update,blockNum) => {
  // 0 eth -> bsc
  // 1 bsc -> eth
  // 2 rink -> test
  // 3 test -> rink

  let web3_eth = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet
  let BRIDGE = new web3_eth.eth.Contract(BridgeContract.abi,NetworkInfo.eth_bridge);
  
  var ing = true;
    while(ing) {
      BRIDGE.getPastEvents('transferEvent',{fromBlock:blockNum-1,toBlock:'latest'},function(error,transferEvents) {
        console.error("error : ", error);
        console.log("transfer events : " , transferEvents);
        if (transferEvents.length != 0) {
          console.log("transfer not 0");
        }
      }).then((events) => {
        if(events.length !== 0 ) {
          ing = false;
          update(webActions.WEB,{ type : webActions.CHANGE_SWAPPERCENT, payload : 100 });
          switch(web.language) {
            case 'kr' :
              alert("스왑 완료.")
              break;
            case 'en' :
              alert("Swap succeeded.")
              break;
            default :
          }
        }
      });                 
      await delay(5000);
    }            
    update(webActions.WEB, 
        { type :webActions.OPEN_SWAP, 
          payload : { 
            swapMonitor : false,
            swapPercent : 0 
          }
    });
}