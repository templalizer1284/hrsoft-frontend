import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRExpensesCalculate() {

    const [notif, setNotif] = useState();

    const refs = {
	inputMonth: useRef(null)
    };

    function calculate() {
	setNotif(<LOADING />);

	axios.get("/api/expenses/calculate", {
	    params: {
		month: refs.inputMonth.current.value
	    }
	})
	    .then((res) => {
		setNotif(() => {
		    return(
                        <div style={{fontSize: 22, width: 500,
				     borderStyle: "dotted",
				     borderWidth: 5,
				     borderColor: "black",
				     borderRadius: 5,
				     position: "absolute",
				     top: 250}}>
			    Expenses are <div style={{ display: "inline-block",fontWeight: "bold"}}>{res.data}</div> ¤.
			</div>
		    );
		});
	    })
	    .catch((err) => {
		setNotif(err.message);
	    });
    }
    
    return(
        <div id="HRExpensesCalculate">
            <h2>Calculate expenses by month:</h2>
            <div style={{margin: 10, fontSize: 15}}>These expenses consist of all employees salaries plus general daily expenses.</div>
            <div className="FormEntry">
		<div className="HRForm">
		    <label for="exp_calc">Select month: </label>
		    <select ref={refs.inputMonth} name="exp_calc">
			<option value="100">CURRENT</option>
			<option value="1">January</option>
			<option value="2">February</option>
			<option value="3">March</option>
			<option value="4">April</option>
			<option value="5">May</option>
			<option value="6">June</option>
			<option value="7">July</option>
			<option value="8">August</option>
			<option value="9">September</option>
			<option value="10">October</option>
			<option value="11">November</option>
			<option value="12">December</option>
		    </select>
		</div>
		<div className="button-center ">
		    <button className="content_button" onClick={calculate}>
			Calculate
		    </button>
		</div>
		{notif}
	    </div>
	</div>
    );
}
