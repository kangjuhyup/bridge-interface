
import './App.css';
import React from "react";
import img_4 from './images/img_4.png';
import refrash from './images/refrash.svg';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Modal from 'react-bootstrap/Modal';
import { useTranslation,withTranslation, Trans } from 'react-i18next'; 
import {useSelector, useDispatch} from 'react-redux';

import * as walletActions from './Actions/connectInfo';
import * as webActions from './Actions/webInfo';


import WalletInfo from './Components/wallet';
import BtnConnect from './Components/btnConnect';
import FeeInfo from './Components/fee'
import ModalAgreement from './Components/agreement'
import BtnNetwork from './Components/btnNetwork'
import DataField from './Components/dataField';
import TopBar from './Components/top';




const App = () => { 
  const web = useSelector((store) => store.web);
  const wallet = useSelector((store) => store.wallet);
  const dispatch = useDispatch();
  const update_ = (type,data) => {
    if ( type === walletActions.WALLET) {
        dispatch(walletActions.update(data));
    } else if ( type === webActions.WEB) {
        dispatch(webActions.update(data));
    }
  }
  const { t } = useTranslation();


    return (
      <div className="App">
          <TopBar data = { {t : t, web : web, wallet: wallet, update : update_ }}></TopBar>


      <body className="App-body">
      {web.openAgree  && <ModalAgreement data = { {t : t, web : web, wallet: wallet, update : update_ }}></ModalAgreement> }

        <Modal className = "modal" size="lg" aria-labelledby="contained-modal-title-vcenter" centered show={web.pending}>
          <div className="flex-column justify-content-center">
            <p>
              <img src={refrash}/>
              <Trans>{t("A_001")}</Trans>
            </p>
            <a href={web.scanUrl} target="_blank">
              <p>{web.urlLinkTxt}
              </p>
            </a>
          </div>
        </Modal>
        <section id="hero" className="d-flex flex-column justify-content-center">
          <div className="container">          
          <WalletInfo data = { {t : t, web : web, wallet: wallet, update : update_ }}/>
          <div className="button_div1"><div className="beta">Beta</div></div>
            <BtnConnect data = { {t : t, web : web, wallet: wallet, update : update_ }}/>
            <BtnNetwork data = { {t : t, web : web, wallet: wallet, update : update_ }}/>
            <FeeInfo data = { {t : t, web : web, wallet: wallet, update : update_ }}/>
            <img  className="button_img" src={img_4} alt=""/>
            {!web.swapMonitor ? <DataField data = {{t : t, web : web, wallet: wallet, update : update_ }}/> : <div><ProgressBar animated now={web.swapPercent}/></div> }  
          </div>
        </section>        
        </body>
      </div>
    );
}


export default withTranslation()(App);