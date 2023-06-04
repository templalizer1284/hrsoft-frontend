import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRExpensesManage() {

    const [AddNotif, setAddNotif] = useState();
    const [RemoveNotif, setRemoveNotif] = useState();

    const add_refs = {
	inputName: useRef(null), 
	inputPrice: useRef(null),
	inputMonth: useRef(null),
	inputYear: useRef(null)
    };

    const remove_refs = {
	inputName: useRef(null),
    };

    function add() {
	setAddNotif(<LOADING />);
	
	let data = {
	    name: add_refs.inputName.current.value,
	    price: add_refs.inputPrice.current.value,
	    month: add_refs.inputMonth.current.value,
	    year: add_refs.inputYear.current.value
	};

	axios.post("/api/expenses/add", data)
	    .then((res) => {
		setAddNotif(res.data);
	    })
	    .catch((err) => {
		setAddNotif(err.message);
	    });

	add_refs.inputName.current.value = "";
	add_refs.inputPrice.current.value = "";
    }

    function remove() {
	setRemoveNotif(<LOADING />);

	axios.delete("/api/expenses/remove",
		     {
			 params: {
			     name: remove_refs.inputName.current.value
			 }
		     },
		    )
	    .then((res) => {
		setRemoveNotif(res.data);
	    })
	    .catch((err) => {
		setRemoveNotif(err.message);
	    });

	remove_refs.inputName.current.value = "";
    }
    
    return(
        <div id="HRExpensesManage">
            <div className="FormEntry">
		<h2>Add expense:</h2>
		<div className="HRForm">
		    <label for="expenseadd_name">Expense name: </label>
		    <input ref={add_refs.inputName} name="expenseadd_name" type="text"/>
		</div>
		<div className="HRForm">
		    <label for="expenseadd_price">Price: </label>
		    <input ref={add_refs.inputPrice} name="expenseadd_price" type="number"/>
		</div>
		<div className="HRForm">
		    <label for="month">Select month: </label>
		    <select ref={add_refs.inputMonth} name="month">
			<option value="0">None</option>
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
		<div className="HRForm">
		    <label for="year">Year: </label>
		    <input ref={add_refs.inputYear} name="year" type="number" value="0" />
		</div>
		<div className="button-center">
		    <button className="content_button" onClick={add}>Add Expense</button>
		</div>
		{AddNotif}
	    </div>
	    <div className="FormEntry">
		<h2>Remove expense:</h2>
		<div className="HRForm">
		    <label for="expensedelete_name">Expense name: </label>
		    <input ref={remove_refs.inputName} name="expensedelete_name" type="text"/>
		</div>
		<div className="button-center">
		    <button className="content_button" onClick={remove}>Delete Expense</button>
		</div>
		{RemoveNotif}
	    </div>
	</div>
    );
}
