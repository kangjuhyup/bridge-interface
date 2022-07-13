import React, { useEffect } from 'react'
import '../App.css';
import * as service from '../Service';
import { withTranslation, Trans } from 'react-i18next'; 

const BtnConnect = (_data) => {
  const data = _data.data;
  const t = data.t;
  useEffect(() => {
    if (data.wallet.connect){
      console.log('data.web : ' , data.web)
      service.GetFee(data.wallet,data.web,data.update)
      service.GetDfmBalance(data.wallet,data.web,data.update);
      service.CheckApproval(data.wallet,data.web,data.update);
    }
  },[data.wallet.connectAddress,data.wallet.chainId])
  
  const connect = () => {
    service.Connect(data.wallet,data.web,data.update);
  }

    return(
        <div className="header_button">
              <div className="button_div3">   
                <div>
                  <button className="button1" onClick={connect}>
                      {!data.wallet.connect && <Trans>{t("B_001")}</Trans>}
                      {data.wallet.connect && <Trans>{t("B_002")}</Trans>}
                    </button>
                </div>
            </div>
          </div>
    )
}


  
export default withTranslation()(BtnConnect);