import React from 'react';
import '../App.css';
import * as service from '../Service';
import { BsArrowClockwise } from "react-icons/bs";
const WalletInfo = (_data) => {
    const data = _data.data
    return (
        <div>
            {data.wallet.connect && 
            <div className="connect d-flex flex-column justify-content-center">
             <div className="connect_left"></div> 
              <p className="connect_p">{data.wallet.connectAddress}</p>
              <p>
                  {data.wallet.balance}
                   <button className="button3" onClick={() => service.GetDfmBalance(data.wallet,data.web,data.update)}>
                       <BsArrowClockwise/>
                    </button>
                </p>
              <p>{data.wallet.accountNetwork}</p>
              <div className="connect_right"></div>
            </div> 
            }    
        </div>
    )
}

export default WalletInfo;