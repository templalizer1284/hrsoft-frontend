import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRExpensesInvoice() {

    const [notif, setNotif] = useState();

    const refs = {
	inputId: useRef(null),
	inputMonth: useRef(null)
    };

    function invoice() {
	setNotif(<LOADING />);
	axios.get("/api/employee/invoice",
		  {
		      params: {
			  id: refs.inputId.current.value,
			  month: refs.inputMonth.current.value
		      }
		  })
	    .then((res) => {
		setNotif(res.data);
	    })
	    .catch((err) => {
		setNotif(err.message);
	    });
	refs.inputId.current.value = "";
    }
    
    return(
        <div id="HRExpensesInvoice">
            <div className="FormEntry">
		<h2>Invoice calculation: </h2>
		<div className="HRForm">
		    <label for="invoice_id">Employee ID: </label>
		    <input ref={refs.inputId} name="invoice_id" type="number"/>
		</div>
		<div className="HRForm">
		    <label for="invoice_months">Month: </label>
		    <select ref={refs.inputMonth} name="invoice_months">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
			<option value="4">4</option>
			<option value="5">5</option>
			<option value="6">6</option>
			<option value="7">7</option>
			<option value="8">8</option>
			<option value="9">9</option>
			<option value="10">10</option>
			<option value="11">11</option>
			<option value="12">12</option>
		    </select>
		</div>
		<div className="button-center">
		    <button className="content_button" onClick={invoice}>Pay</button>
		</div>
		{notif}
	    </div>
	</div>
    );
}
