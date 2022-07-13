export const WEB = "WEB"

export const SET_LANGUAGE = "SET_LANGUAGE"
export const CHANGE_AMOUNT = "CHANGE_AMOUNT"
export const CHANGE_TOADDR = "CHANGE_TOADDR"
export const CHANGE_APPROVAL = "CHANGE_APPROVAL"
export const SET_FEE = "SET_FEE"
export const OPEN_AGREE = "OPEN_AGREE"
export const OPEN_SWAP = "OPEN_SWAP"
export const CHANGE_SWAPPERCENT = "CHANGE_SWAPPERCENT"
export const OPEN_PENDING = "OPEN_PENDING"
export const CHANGE_NETWORK = "CHANGE_NETWORK"
export const SET_SWAPTYPE = "SET_SWAPTYPE"
export const CHANGE_AGREE = "CHANGE_AGREE"
export const FIRST_ACTION = "FIRST_ACTION"

export const update = ( data ) => {
    return {
        type : data.type,
        payload : data.payload,
    }
}