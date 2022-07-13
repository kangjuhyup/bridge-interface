export const WALLET = "WALLET"

export const CONNECT_WALLET = "CONNECT_WALLET"
export const CHANGE_ADDRESS = "CHANGE_CONNECT_ADDRESS"
export const CHANGE_CHAINID = "CAHNGE_CHAINID"
export const DISCONNECT_WALLET = "DISCONNECT_WALLET"
export const CHANGE_BALANCE = "CHANGE_BALANCE"
export const SET_PROVIDER = "SET_PROVIDER"

export const update = ( data ) => {
    return {
        type : data.type,
        payload : data.payload,
    }
}