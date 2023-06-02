import "./Common.js";

import "./Styles/HRSoft.css";
import LoadingGIF from "../Media/loading.gif";
import WarningSVG from "../Media/warning.svg";

export function LOADING() {
    return(
        <div className="loading">
            <img alt="GIF" src={LoadingGIF}/>
	</div>
    );
};

export function WARNING() {
    return(
        <div className="warning">
            <img alt="ACHTUNG" src={WarningSVG}/>
	</div>
    );
};
