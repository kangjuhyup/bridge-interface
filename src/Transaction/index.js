import * as webActions from '../Actions/webInfo';
import NetworkInfo from '../DFMbridge/NetworkInfo';
import * as monitor from '../Mornitor';
import * as service from '../Service';
import Web3 from 'web3';

export const Approve = (wallet,web,update) => {   
    if(!web.agree) {
      switch(web.language) {
        case 'kr' :            
          alert("이용약관에 동의해주세요.") 
          break;
        case 'en' :
          alert("Please agree to the terms and conditions.")
          break;
      }

      return;
    }
    if(!wallet.connect) {

      switch(web.language) {
        case 'kr' :
          alert("지갑을 연결해 주세요.");
          break;
        case 'en' :
          alert("Please connect your wallet.")
          break;
      }
      return;
    }
    var token;
    var bridge;
    if (wallet.isWC) {
      let arr = service.CheckNetwork();
      token = arr[0];
      bridge = arr[1];
      MakeApproveTx(wallet,web,update,token,bridge);
    } else {
        switch(wallet.chainId) {
          case NetworkInfo.eth_chainId :
            token = NetworkInfo.eth_DFM;
            bridge = NetworkInfo.eth_bridge;
            break;
          case NetworkInfo.bsc_chainId :
            token = NetworkInfo.bsc_DFM;
            bridge = NetworkInfo.bsc_bridge;
            break;
        }
        MakeApproveTx(wallet,web,update,token,bridge);
    }
  }

export const MakeApproveTx = (wallet,web,update,token,bridge) => {
    
    var web3;
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
      // Draft transaction
      const tx = {
        from: wallet.connectAddress, // Required
        to: token, // Required (for non contract deployments)
        data: web3.eth.abi.encodeFunctionCall({
          name: 'approve',
          type: 'function',
          inputs: [{
              type: 'address',
              name: 'spender'
          },{
              type: 'uint256',
              name: 'amount'
          }]
      }, [bridge, web3.utils.toWei("2000000000","ether")]), // Required
    };

    monitor.SendTx(wallet,web,update,0,0,tx);  

      
    
    console.log("sendApprove");
  }

export const Swap = (wallet,web,update) => {

    console.log("ClickSwap");
    if(!web.agree) {
      switch(this.state.lan) {
        case 'kr' :
          alert("이용약관에 동의해주세요.") 
          break;
        case 'en' :
          alert("Please agree to the terms and conditions.")
          break;
      }
      return;
    }
    if(!wallet.connect) {
      switch(web.language) {
        case 'kr' :
          alert("지갑을 연결해 주세요.");
          break;
        case 'en' :
          alert("Please connect your wallet.")
          break;
      }
      return;
    }

    let web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url));
    web3.eth.getBlock('latest').then((block) => {
       let baseFee = web3.utils.fromWei(web3.utils.toBN(block.baseFeePerGas),'Gwei')
       console.log('baseFee : ' , baseFee)
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
       } else {
        var bridge;
        if (wallet.isWC) {
          let arr = service.CheckNetwork();
          bridge = arr[1];
          switch(web.webChainId) {
            case NetworkInfo.eth_chainId :
              bridge = NetworkInfo.eth_bridge;
              console.log("bridge : " , bridge);
              update(webActions.WEB,{ type : webActions.SET_SWAPTYPE, payload : 0 });
              MakeSwapTx(wallet,web,update,bridge,0);
              break;
            case NetworkInfo.bsc_chainId :
              bridge = NetworkInfo.bsc_bridge;
              console.log("bridge : " , bridge);
              update(webActions.WEB,{ type : webActions.SET_SWAPTYPE, payload : 1 });
              MakeSwapTx(wallet,web,update,bridge,1);
              break;
          } 
        }  else {
            switch(web.webChainId) {
              case NetworkInfo.eth_chainId :
                bridge = NetworkInfo.eth_bridge;
                console.log("bridge : " , bridge);
                update(webActions.WEB,{ type : webActions.SET_SWAPTYPE, payload : 0 });
                MakeSwapTx(wallet,web,update,bridge,0);
                break;
              case NetworkInfo.bsc_chainId :
                bridge = NetworkInfo.bsc_bridge;
                console.log("bridge : " , bridge);
                update(webActions.WEB,{ type : webActions.SET_SWAPTYPE, payload : 1 });
                MakeSwapTx(wallet,web,update,bridge,1);
                break;
            }      
        }    
       }
    })

  }

export const MakeSwapTx = (wallet,web,update,bridge,net) => {
    if(web.amount < parseInt(web.fee)+1) {
      let msg = parseInt(web.fee)+1
      switch(web.language) {
        case 'kr' :
          alert("옮길 금액은 "+msg+ "DFM 이상이어야 합니다.");
          break;
        case 'en' :
          alert("The amount to be swapped has to be bigger than "+msg+" DFM.");
      }
      return;
    }
    var web3;
    switch(wallet.chainId) {
      case NetworkInfo.eth_chainId :
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.eth_url)); // eth mainnet
        console.log('web3 : ' ,web3)
        break;
      case NetworkInfo.bsc_chainId :
        web3 = new Web3(new Web3.providers.HttpProvider(NetworkInfo.bsc_url)); // bsc mainnet
        break;
      default :
        return;
    }
      web3.eth.call({
        to : bridge,
        data : web3.eth.abi.encodeFunctionCall({
          name: 'getStatus',
          type: 'function',
          inputs : []
        }, [])
      }).then( status => {
        console.log('steatus : ' ,web3.utils.hexToNumber(status) )
        if (web3.utils.hexToNumber(status)===1) {
          switch(web.language) {
            case 'kr' :
              return alert("현재 다른 스왑처리 중으로 사용하실 수 없습니다.")
              
            case 'en' :
              return alert("Cannot make a swap request to Smart-contract now.")
              
            default :
          }
        }
        const tx = {
          from: wallet.connectAddress, // Required
          to: bridge, // Required (for non contract deployments)
          data: web3.eth.abi.encodeFunctionCall({
            name: 'swap',
            type: 'function',
            inputs: [{
                type: 'uint256',
                name: 'value'
            },{
                type: 'address',
                name: 'to'
            }]
        }, [web3.utils.toWei(web.amount,"ether"),web.toAddr]), // Required
        };
        monitor.SendTx(wallet,web,update,1,net,tx);
      });    
  }