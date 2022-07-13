import React from 'react'
import '../App.css';
import { withTranslation, Trans } from 'react-i18next'; 
import * as service from '../Service';

const FeeInfo = (_data) => {
    const data = _data.data;
    const t = data.t;
    if ( data.web.fee == 0 ) {
        service.GetFee(data.wallet,data.web,data.update)
    }
    return(
        <div>
            <p>
                <Trans>{t("L_001_1")}</Trans>
                {data.web.fromNetwork}
                <Trans>{t("L_001_2")}</Trans>
                {data.web.toNetwork}
                <Trans>{t("L_001_3")}<br/>Swap Fee : {data.web.fee} DFM</Trans>
            </p>
        </div>
    )
}

  
  export default withTranslation()(FeeInfo);