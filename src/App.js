import { useState } from "react";

import PANEL from "./Components/Panel.js";

import "./Components/Common.js";
import { LOADING } from "./Components/Common.js";

import HRBackgroundImage from "./Media/hs_background.svg";

import "./Components/Styles/Common.css";

function HRBackground() {
    return(
        <div id="HRBackground">
            <img alt="HRBPic" src={HRBackgroundImage} draggable="false" />
	</div>
    );
}

export default function App() {

    const [content, setContent] = useState();
    
    return (
	<div className="App">
	    <HRBackground />
	    <PANEL setter={setContent} />
	    {content}
	</div>
    );
}
