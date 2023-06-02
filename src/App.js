import { useState } from "react";

import PANEL from "./Components/Panel.js";

import "./Components/Common.js";
import { LOADING } from "./Components/Common.js";

export default function App() {

    const [content, setContent] = useState();
    
    return (
	<div className="App">
	    <PANEL setter={setContent} />
	    {content}
	</div>
    );
}
