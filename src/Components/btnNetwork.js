import '../App.css';

/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
} from 'react';

import * as webActions from '../Actions/webInfo';
import i18n from '../Config/i18n';
import * as service from '../Service';

const NETWORKS = {
    0: 'ETH',
    1: 'BSC',
    // 2: 'SOL'
}

let defaultLang = 'en';
let defaultFrom = 0;
let defaultTo = 1;

const BtnNetwork = ({data}) => {
    // SOLANA 인터페이스에서 이동한 경우
    const parameters = window.location.search.substring(1).split("&");
    if (parameters.length === 3) {
        // defaultFrom = parseInt(parameters[0].split("=")[1]);
        // defaultTo = parseInt(parameters[1].split("=")[1]);
        defaultLang = parameters[2].split("=")[1];
    }
    
    const [fromNetwork, setFromNetwork] = useState(defaultFrom);
    const [toNetwork, setToNetwork] = useState(defaultTo);
    const {wallet, web, update} = data;

    /**
     * DFM을 보낼 송수신 네트워크 설정 값을 갱신합니다.
     * @param {String} sourceType 
     * @param {Integer} optValue 
     */
    const onSelectNetwork = (sourceType, optValue) => {
        let newFromNetwork = fromNetwork;
        let newToNetwork = toNetwork;

        if (sourceType === 'from') {
            newFromNetwork = optValue
            if (toNetwork === optValue) newToNetwork = fromNetwork;   // 값이 같으면 스왑
        } else if (sourceType === 'to') {
            newToNetwork = optValue;
            if (fromNetwork === optValue) newFromNetwork = toNetwork; // 값이 같으면 스왑
        }

        let id = "ethToBsc";
        if (newFromNetwork === 1 && newToNetwork === 0) id = "bscToEth";
        if (newFromNetwork === 1 && newToNetwork === 2) id = "bscToSol";
        if (newFromNetwork === 0 && newToNetwork === 1) id = "ethToBsc";
        if (newFromNetwork === 0 && newToNetwork === 2) id = "ethToSol";

        if (fromNetwork === 2) {    
            const lang = i18n.language;
            window.location.href = "https://testbridge.dfmeco.io/solana?from=" + fromNetwork + "&to=" + toNetwork + "lang=" + lang;
        }

        setFromNetwork(newFromNetwork);
        setToNetwork(newToNetwork);
        service.SetNetwork(wallet, web, update, id);
    }

    useEffect(() => {
        data.update(webActions.WEB,{ type : webActions.SET_LANGUAGE, payload : defaultLang });
        i18n.changeLanguage(defaultLang);
        service.GetFee(wallet, web, update);
        service.CheckApproval(wallet, web, update);
    },[])

    return (
        <div className="header_button">
            <div className="button_div">
                <select className="select" id="fromNetwork" value={fromNetwork} onChange={({target}) => onSelectNetwork('from', parseInt(target.value))}>
                    {Object.keys(NETWORKS).map((key) => (<option key={key} value={key}>{NETWORKS[key]}</option>))}
                </select>
                <select className="select" id="toNetwork" value={toNetwork} onChange={({target}) => onSelectNetwork('to', parseInt(target.value))}>
                    {Object.keys(NETWORKS).map((key) => (key !== '2' && <option key={key} value={key}>{NETWORKS[key]}</option>))}
                </select>
            </div>
        </div>
    )
};
  
export default BtnNetwork;