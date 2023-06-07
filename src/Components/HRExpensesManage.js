import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useRef } from "react";

export default function HRExpensesManage() {

    const [AddNotif, setAddNotif] = useState();
    const [RemoveNotif, setRemoveNotif] = useState();

    const add_refs = {
	inputName: useRef(null), 
	inputPrice: useRef(null),
    };

    const remove_refs = {
	inputName: useRef(null),
    };

    function add() {
	setAddNotif(<LOADING />);
	
	let data = {
	    name: add_refs.inputName.current.value,
	    price: add_refs.inputPrice.current.value,
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
