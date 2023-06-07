import { LOADING, WARNING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

import "./Styles/HRTermination.css";

export default function HRTermination() {

    const [TerminateNotif, setTerminateNotif] = useState();
    const [TerminateNotifInput, setTerminateNotifInput] = useState(() => {
	return(
	    <div style={{opacity: 0}}>Bleh</div>
	);
    });

    let refs = {
	inputId: useRef(null)
    };

    function terminate() {
	if(refs.inputId.current.value === "") {
	    setTerminateNotifInput(() => {
		return(
		    <div style={{color: "#EA0000", marginLeft: 145, inlineSize: "max-content"}}>Please fill in the ID input of employee.</div>
		);
	    });
	    document.getElementById("terminate_input_id").style.borderColor = "#EA0000";
	    return;
	}

	setTerminateNotif(<LOADING />);
	
	axios.delete("/api/employee/terminate",
		     {
			 params: {
			     id: refs.inputId.current.value
			 }
		     })
	    .then((res) => {
		setTerminateNotif(res.data);
	    })
	    .catch((err) => {
		setTerminateNotif(err.message);
	    });

	refs.inputId.current.value = "";
    }
    
    return(
        <div id="HRTermination" style={{width: 400}}>
            <div className="FormEntry">
		<h2>Termination Form: </h2>
		{TerminateNotifInput}
		<div className="HRForm">
		    <label for="term_id">Employee ID: </label>
		    <input ref={refs.inputId} name="term_id" id="terminate_input_id" type="number" />
		</div>
		<div className="button-center" style={{
			 display: "flex",
			 justifyContent: "start",
			 columnGap: 15,
			 alignItems: "center",
			 position: "initial"
		     }}>
		    <button className="content_button" id="terminate_button" onClick={terminate} onMouseEnter={() => {
				document.getElementById("warning_text").style.opacity = 1;
			    }}
			    onMouseLeave={() => {
				document.getElementById("warning_text").style.opacity = 0;
			    }}>Terminate</button>
		    <div id="warning_overlay">
			<WARNING />
			<div id="warning_text">
			    By clicking this button you are firing the employee.
			</div>
		    </div>
		</div>
		{TerminateNotif}
	    </div>
	</div>
    );
}
