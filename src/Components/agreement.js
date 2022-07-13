import React from 'react'
import '../App.css';
import { withTranslation, Trans } from 'react-i18next'; 
import * as webActions from '../Actions/webInfo';

const ModalAgreement = (_data) => {
    const data = _data.data;
    const t = data.t;
    return(
    <div id="popup_layer">
        <div className="popup_box">
            <div className="popup_cont">
              <h3><Trans>{t("T_001")}</Trans></h3>
              <h4><Trans>{t("T_001_1")}</Trans></h4>
              
              <h6><Trans>{t("T_001_1_1")}</Trans></h6>
              <p><Trans>{t("T_001_1_1_1")}</Trans><br /></p>

              <h6><Trans>{t("T_001_1_2")}</Trans></h6>
              <p><Trans>{t("T_001_1_2_1")}</Trans><br />
              <Trans>{t("T_001_1_2_2")}</Trans><br />
              <Trans>{t("T_001_1_2_3")}</Trans><br />
              <Trans>{t("T_001_1_2_4")}</Trans><br />
              <Trans>{t("T_001_1_2_5")}</Trans><br />
              <Trans>{t("T_001_1_2_6")}</Trans><br />
              <Trans>{t("T_001_1_2_7")}</Trans><br /></p>

              <h6><Trans>{t("T_001_1_3")}</Trans></h6>
              <p><Trans>{t("T_001_1_3_1")}</Trans><br /></p>
              <p className="terms"><Trans>{t("T_001_1_3_1_1")}</Trans><br />
              <Trans>{t("T_001_1_3_1_2")}</Trans><br />
              <Trans>{t("T_001_1_3_1_3")}</Trans><br />
              <Trans>{t("T_001_1_3_1_4")}</Trans><br />
              <Trans>{t("T_001_1_3_1_5")}</Trans><br />
              <Trans>{t("T_001_1_3_1_6")}</Trans><br />
              <Trans>{t("T_001_1_3_1_7")}</Trans><br />
              <Trans>{t("T_001_1_3_1_8")}</Trans><br />
              <Trans>{t("T_001_1_3_1_9")}</Trans><br />
              <Trans>{t("T_001_1_3_1_10")}</Trans><br />
              <Trans>{t("T_001_1_3_1_11")}</Trans><br />
              <Trans>{t("T_001_1_3_1_12")}</Trans><br />
              <Trans>{t("T_001_1_3_1_13")}</Trans><br />
              </p>
  
              <h4><Trans>{t("T_001_2")}</Trans></h4>
  
              <h6><Trans>{t("T_001_2_1")}</Trans></h6>
              <p><Trans>{t("T_001_2_1_1")}</Trans><br />
              <Trans>{t("T_001_2_1_2")}</Trans><br /></p>

              <h6><Trans>{t("T_001_2_2")}</Trans></h6>
              <p><Trans>{t("T_001_2_2_1")}</Trans><br /></p>
              <p className="terms"><Trans>{t("T_001_2_2_1_1")}</Trans><br />
              <Trans>{t("T_001_2_2_1_2")}</Trans><br /></p>

              <h6><Trans>{t("T_001_2_3")}</Trans></h6>
              <p><Trans>{t("T_001_2_3_1")}</Trans><br />
              <Trans>{t("T_001_2_3_2")}</Trans><br />
              <Trans>{t("T_001_2_3_3")}</Trans><br /></p>
              <p className="terms"><Trans>{t("T_001_2_3_3_1")}</Trans><br />
              <Trans>{t("T_001_2_3_3_2")}</Trans><br />
              <Trans>{t("T_001_2_3_3_3")}</Trans><br />
              <Trans>{t("T_001_2_3_3_4")}</Trans><br />
              <Trans>{t("T_001_2_3_3_5")}</Trans><br />
              <Trans>{t("T_001_2_3_3_6")}</Trans><br /></p>
              <p className="terms1"><Trans>{t("T_001_2_3_4")}</Trans><br /></p>

              <h6><Trans>{t("T_001_2_4")}</Trans></h6>
              <p><Trans>{t("T_001_2_4_1")}</Trans><br /></p>
              <p className="terms"><Trans>{t("T_001_2_4_1_1")}</Trans><br />
              <Trans>{t("T_001_2_4_1_2")}</Trans><br /></p>

              <h6><Trans>{t("T_001_2_5")}</Trans></h6>
              <p><Trans>{t("T_001_2_5_1")}</Trans><br />
              <Trans>{t("T_001_2_5_2")}</Trans><br /></p>
          
              <h6><Trans>{t("T_001_2_6")}</Trans></h6>
              <p><Trans>{t("T_001_2_6_1")}</Trans><br />
              <Trans>{t("T_001_2_6_2")}</Trans><br />
              <Trans>{t("T_001_2_6_3")}</Trans><br /></p>
       
              <h6><Trans>{t("T_001_2_7")}</Trans></h6>
              <p><Trans>{t("T_001_2_7_1")}</Trans><br />
              <Trans>{t("T_001_2_7_2")}</Trans><br />
              <Trans>{t("T_001_2_7_3")}</Trans><br />
              <Trans>{t("T_001_2_7_4")}</Trans><br /></p>
   
              <h6><Trans>{t("T_001_2_8")}</Trans></h6>
              <p><Trans>{t("T_001_2_8_1")}</Trans><br />
              <Trans>{t("T_001_2_8_2")}</Trans><br />
              <Trans>{t("T_001_2_8_3")}</Trans><br />
              </p>
              <h4><Trans>{t("T_001_3")}</Trans></h4> 
  
              <h6><Trans>{t("T_001_3_1")}</Trans></h6>
              <p><Trans>{t("T_001_3_1_1")}</Trans><br />
              <Trans>{t("T_001_3_1_2")}</Trans><br />
              <Trans>{t("T_001_3_1_3")}</Trans><br />
              <Trans>{t("T_001_3_1_4")}</Trans><br />
              </p>
  
              <h4><Trans>{t("T_001_4")}</Trans></h4> 
  
              <h6><Trans>{t("T_001_4_1")}</Trans></h6>
              <p><Trans>{t("T_001_4_1_1")}</Trans><br />
              <Trans>{t("T_001_4_1_2")}</Trans><br />
              <Trans>{t("T_001_4_1_3")}</Trans><br /></p>
        
              <h6><Trans>{t("T_001_4_2")}</Trans></h6>
              <p><Trans>{t("T_001_4_2_1")}</Trans><br />
              <Trans>{t("T_001_4_2_1_1")}</Trans><br />
              <Trans>{t("T_001_4_2_1_2")}</Trans><br />
              <Trans>{t("T_001_4_2_1_3")}</Trans><br />
              <Trans>{t("T_001_4_2_1_4")}</Trans><br />
              <Trans>{t("T_001_4_2_1_5")}</Trans><br />
              <Trans>{t("T_001_4_2_1_6")}</Trans><br />
              <Trans>{t("T_001_4_2_1_7")}</Trans><br />
              <Trans>{t("T_001_4_2_1_8")}</Trans><br /></p>
              
              <h6><Trans>{t("T_001_4_3")}</Trans></h6>
              <p><Trans>{t("T_001_4_3_1")}</Trans>
              </p>
            </div>
            <button onClick={() => data.update(webActions.WEB,{type : webActions.OPEN_AGREE, payload : false })} className="popup_btn">
              <Trans>{t("T_002")}</Trans>
            </button>
        </div> 
      </div>
    )
}

  
  export default withTranslation()(ModalAgreement);