
import * as webActions from '../Actions/webInfo';
import i18n from '../Config/i18n';

const ListLanguage = (_data) => {
    const clickStyle = {
        color : "white",
        fontWeight : "bold"
    }
    const data = _data.data;
    const handleChange = (lan,e) => {
        console.log('this is : ', e)
        data.update(webActions.WEB,{ type : webActions.SET_LANGUAGE, payload : lan });
        i18n.changeLanguage(lan);
        let prev = document.getElementById(data.web.language);
        console.log('prev : ' , prev);
        prev.style = "";
        let current = document.getElementById(lan);
        current.style = "color:white; font-weight:bold;"
    }

    return (
        <div className="languages d-md-flex align-items-center">
            <ul>
                <li><a id ="kr" onClick={() => handleChange('kr')}>Ko</a></li>
                <li><a style={clickStyle} id ="en" onClick={() => handleChange('en')}>En</a></li>
            </ul>
        </div>
    )
}

export default ListLanguage;