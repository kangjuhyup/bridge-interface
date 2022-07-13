import { combineReducers } from 'redux'
import { CHANGE_ADDRESS, CHANGE_CHAINID, DISCONNECT_WALLET, CONNECT_WALLET, CHANGE_BALANCE } from '../Actions/connectInfo'
import { SET_LANGUAGE, CHANGE_APPROVAL, CHANGE_AMOUNT, SET_FEE, OPEN_AGREE, OPEN_SWAP, CHANGE_SWAPPERCENT, OPEN_PENDING, SET_SWAPTYPE, CHANGE_NETWORK, CHANGE_TOADDR, CHANGE_AGREE, FIRST_ACTION } from '../Actions/webInfo'
import Web3 from 'web3'
import NetworkInfo from '../DFMbridge/NetworkInfo';

const walletState = {
    connectAddress : '',
    connect: false,
    accountNetwork : '',
    chainId : 0,
    isWc : false,
    balance : '',
    web3 : new Web3()
}

const webState = {
    firstAction : false,
    webChainId : NetworkInfo.eth_chainId,
    language : 'en',
    amount : 0,
    isApproval : false,
    fee : 0,
    fromNetwork : 'ETH',
    toNetwork : 'BSC',
    openAgree : false,
    agree : false,
    swapMonitor : false,
    swapPercent : 0,
    swapType : 0,
    pending : false,
    scanUrl : '',
    urlLinkTxt : '',
    clickBtnId : 'ethToBsc',
    toAddr : '',
}

const wallet = ( state = walletState, action ) => {
    switch (action.type) {
        case CONNECT_WALLET :
            return {
                ...state,
                connectAddress : action.payload.connectAddress,
                connect : action.payload.connect,
                accountNetwork : action.payload.accountNetwork,
                chainId : action.payload.chainId,
                isWc : action.payload.isWc,
                web3 : action.payload.web3
            };
        case CHANGE_ADDRESS :
            return {
                ...state,
                connectAddress : action.payload,
            };
        case CHANGE_CHAINID :
            return {
                ...state,
                chainId : action.payload.chainId,
                accountNetwork : action.payload.accountNetwork,
            }
        case DISCONNECT_WALLET :
            return {
                ...state,
                connectAddress : '',
                connect: false,
                accountNetwork : '',
                chainId : 0,
                isWc : false,
                balance : '',
            }
        case CHANGE_BALANCE :
            return {
                ...state,
                balance : action.payload
            }
        default:
            return state;
    }
}

const web = ( state = webState, action) => {
    switch(action.type) {
        case SET_LANGUAGE :
            return {
                ...state,
                language : action.payload
            }
        case CHANGE_AMOUNT :
            return {
                ...state,
                amount : action.payload
            }
        case CHANGE_APPROVAL :
            return {
                ...state,
                isApproval : action.payload
            }
        case SET_FEE :
            return {
                ...state,
                fee : action.payload
            }
        case OPEN_AGREE :
            return {
                ...state,
                openAgree : action.payload
            }
        case OPEN_SWAP :
            return {
                ...state,
                swapMonitor : action.payload.swapMonitor,
                swapPercent : action.payload.swapPercent
            }
        case CHANGE_SWAPPERCENT :
            return {
                ...state,
                swapPercent : action.payload
            }
        case OPEN_PENDING :
            return {
                ...state,
                pending : action.payload.pending,
                scanUrl : action.payload.scanUrl,
                urlLinkTxt : action.payload.urlLinkTxt,
            }
        case CHANGE_NETWORK :
            return {
                ...state,
                fromNetwork : action.payload.from,
                toNetwork : action.payload.to,
                clickBtnId : action.payload.btnId,
                webChainId : action.payload.webChainId
            }
        case CHANGE_TOADDR :
            return {
                ...state,
                toAddr : action.payload
            }
        case SET_SWAPTYPE :
            return {
                ...state,
                swapType : action.payload
            }
        case CHANGE_AGREE :
            return {
                ...state,
                agree : action.payload
            }
        case FIRST_ACTION :
            return {
                ...state,
                firstAction : true
            }
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    wallet,
    web
})

export default rootReducer;