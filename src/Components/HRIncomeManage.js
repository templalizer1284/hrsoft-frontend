import "./Styles/Common.css";
import "./Styles/HRIncomeManage.css";
import axios from "axios";

import { useState, useRef, useEffect } from "react";
import { LOADING } from "./Common.js";

export default function HRIncomeManage() {

    const [notif, setNotif] = useState();
    const [clients, setClients] = useState(<option value="none">None</option>);
    const [incomes, setIncomes] = useState(<option value="none">None</option>);
    
    useEffect(() => {
	let data = {
	    params: {
		all: true
	    }
	};

	const interval = setInterval(() => {
	    axios.get("/api/client/get", data)
		.then((res) => {
		    setClients(() => {
			return(
			    <>
				{res.data.map(({id,name}) => (
                                    <option key={"client_key-".concat(id)} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})

		.catch((err) => {
		    setNotif(err.message);
		});
	}, 1500);

	return () => {
	    clearInterval(interval);
	};
	
    }, []);
    
    function add() {
	
	let data = new FormData();
	data.append("name", refs.inputIncomeName.current.value);
	data.append("client", refs.inputClient.current.value);
	data.append("revenue", refs.inputRevenue.current.value);

	let header = {
	    headers: {
		"Content-Type" : "application/json"
	    }
	};

	setNotif(<LOADING />);
	
	axios.post("/api/income/add", data, header)
	    .then((res) => {
		setNotif(res.data);
	    })
	    .catch((err) => {
		setNotif(err.message);
	    });
    }

    function remove() {
	let data = {
	    params: {
		name: refs.inputRemoveIncomeName.current.value,
		client: refs.inputRemoveIncome.current.value
	    }
	};

	axios.delete("/api/income/delete", data)
	    .then((res) => {
		setNotif(res.data);
		refs.elementHidden.current.style.visibility = "hidden";
	    })
	    .catch((err) => {
		setNotif(err.message);
	    });
    }

    function fetchIncomes() {
	
	let data = {
	    params: {
		client: refs.inputRemoveIncome.current.value
	    }
	};

	axios.get("/api/income/fetch", data)
	    .then((res) => {
		
		refs.elementHidden.current.style.visibility = "visible";
		setIncomes(() => {
		    return(
			<>
			    {res.data.map(({id,name,client}) => (
                                <option key={"inc_key-".concat(id)} value={name}>{name}</option>
			    ))}
			</>
		    );
		});
	    })

	    .catch((err) => {
		if(err.response.status === 404) {
		    refs.elementHidden.current.style.visibility = "hidden";
		    setNotif(<p>Could not find any type of income by that client.</p>);
		}
	    });
    }

    const refs = {
	inputClient: useRef(null),
	inputIncomeName: useRef(null),
	inputRevenue: useRef(null),
	inputRemoveIncome: useRef(null),
	inputRemoveIncomeName: useRef(null),
	elementHidden: useRef(null)
    };
    
    return(
        <div id="HRIncomeManage">

            <div className="FormEntry">
		<h2>Add income:</h2>
		<div className="HRForm">
                    <label for="income_name">Name: </label>
                    <input ref={refs.inputIncomeName} name="income_name" type="text" />
		</div>
		<div className="HRForm">
                    <label for="client">Client: </label>
                    <select ref={refs.inputClient} name="client">
			{clients}
                    </select>
		</div>
		
		<div className="HRForm">
                    <label for="revenue">Revenue: </label>
                    <input ref={refs.inputRevenue} name="revenue" type="number"/>
		</div>
		
		<div className="button-center">
                    <button className="content_button" onClick={add}>Add income</button>
		</div>

	    </div>
	    
            <div className="FormEntry">
		<h2>Remove income:</h2>
		<div className="HRForm">
                    <label for="remove_income">Client: </label>
                    <select ref={refs.inputRemoveIncome} name="remove_income" onClick={fetchIncomes}>
			{clients}
                    </select>
		</div>
                <div className="HRForm" ref={refs.elementHidden} style={{visibility: "hidden"}}>
                    <label for="inc_remove">Income: </label>
                    <select ref={refs.inputRemoveIncomeName} name="inc_remove">
			{incomes}
                    </select>
		</div>
		<div className="button-center">
                    <button className="content_button" onClick={remove}>Remove income</button>
		</div>
	    </div>
	    
	    {notif}

	</div>
    );
}
