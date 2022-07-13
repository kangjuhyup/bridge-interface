import '../App.css';

import React from 'react';

import {
  Trans,
  withTranslation,
} from 'react-i18next';
import { BsXCircle } from 'react-icons/bs';

import * as webActions from '../Actions/webInfo';
import * as service from '../Service';
import * as tx from '../Transaction';

const DataField = (_data) => {
    const data = _data.data;
    const t = data.t;

    const tfAddressChangeEventListener = (e) => {
        data.update(webActions.WEB,{type : webActions.CHANGE_TOADDR, payload : e.target.value});
    }
    
    const tfValueChangeEventListener = (e) => {
        console.log('tfValueChange')
        data.update(webActions.WEB,{type : webActions.CHANGE_AMOUNT, payload : e.target.value});
    }
    
    const tfValueBlurEvent = () => {
        console.log('BlurEvent : ' , data)
        service.CheckApproval(data.wallet,data.web,data.update)
    }


    const MyAddress = () => {
        if ( data.wallet.connectAddress !== "" ) {
            data.update(webActions.WEB,{type : webActions.CHANGE_TOADDR, payload : data.wallet.connectAddress});
        } else {
            switch(data.web.language) {
                case 'ko' :
                alert("지갑을 연결해 주세요.")
                break;
                case 'en' :
                alert("Please connect your wallet.")
                break;
                default :
            }
        }
    }

    const openAgree = () => {
        data.update(webActions.WEB, {type : webActions.OPEN_AGREE, payload : true });
    }

    const acceptTemrsHandler = () => {
        data.update(webActions.WEB, {type : webActions.CHANGE_AGREE, payload : !data.web.agree });
    }

    return(
        <div>
        { data.web.swapMonitor === false &&
            <div>
            <div className="list">
              <div className="list_div">
                <div>
                  <h5><Trans>{t("L_002")}</Trans></h5>
                  <div className="list_in">
                      <input type="number" onChange = {tfValueChangeEventListener} onBlur={tfValueBlurEvent}/>
                      DFM
                  </div>
                  <h5>{data.web.toNetwork}<Trans>{t("L_004")}</Trans></h5>
                  <div className="list_in">
                    <input type="text" id="tfAddress" value = {data.web.toAddr} onChange = {tfAddressChangeEventListener}/>
                  </div>
                  <div className="header_button">
                    <div className="button_div1">  
                      <button className="button1" onClick={MyAddress}>
                          <Trans>{t("B_003")}</Trans>> 
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="header_button">
              <div className="button_div2">
                  {!data.web.isApproval && <button className="button2" onClick={() => tx.Approve(data.wallet,data.web,data.update)}>
                      Approve
                    </button> }
                  {data.web.isApproval && <button className="button2"  onClick={() => tx.Swap(data.wallet,data.web,data.update)}>
                      Swap
                    </button> }
              </div>
            </div>
            <div className="check">
                <p>
                    <Trans>{t("L_003_1")}</Trans>
                    <u className="hoverAction" onClick={openAgree}>
                        <Trans>{t("L_003_2")}</Trans>
                    </u>
                    <Trans>{t("L_003_3")}</Trans>
                    <input type="checkbox" checked={data.web.agree} onChange={acceptTemrsHandler} />
                </p>
            </div>
            <div className="notice">
                <BsXCircle/> 
                <Trans>{t("L_005")}</Trans>
            </div>
        </div>
    }
    </div>
)}

  
  export default withTranslation()(DataField);