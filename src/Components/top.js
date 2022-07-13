import ListLanguage from './listLanguage'
import { BsEnvelopeOpen } from "react-icons/bs";

const TopBar = (_data) => {
    const data = _data.data

    return (
        <div id="topbar" className="d-flex align-items-center fixed-top">
        <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-none d-md-flex align-items-center">
                <i className="d-flex align-items-center">
                  <BsEnvelopeOpen />
                  <a href="mailto:contactus@dfmeco.io">
                    <span>contactus@mail.dfmeco.io</span>
                  </a>
                </i>
            </div>
            <ListLanguage data ={data}></ListLanguage>
        </div>
        </div>
    )
}
export default TopBar;