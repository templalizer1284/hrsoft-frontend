import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRManageClients() {

    const refs = {
	add: useRef(null),
	remove: useRef(null)
    };

    const [notif, setNotif] = useState();
    const [clients, setClients] = useState(<option value="none">None</option>);

    useEffect(() => {
	const interval = setInterval(() => {
	    let data = {
		params: {
		    all: true
		}
	    };
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
	data.append("name", refs.add.current.value);

	axios.post("/api/client/add", data)
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
		name: refs.remove.current.value
	    }
	};

	axios.delete("/api/client/delete", data)
	    .then((res) => {
		setNotif(res.data);
	    })

	    .catch((err) => {
		setNotif(err.message);
	    });
    }
    
    return (
            <div id="HRManageClients">
            <div className="FormEntry">
            <h2>Add Client:</h2>
            <div className="HRForm">
            <label for="client_add_name">Name:</label>
            <input name="client_add_name" type="text" ref={refs.add} />
	    </div>
            <div className="button-center">
            <button className="content_button" onClick={add}>
	    Add Client
	</button>
	    </div>
	    </div>
	    
            <div className="FormEntry">
            <h2>Remove Client:</h2>
            <div className="HRForm">
            <label for="client_remove_name">Name:</label>
            <select ref={refs.remove} name="client_remove_name">
	    {clients}
        </select>
	    </div>
            <div className="button-center">
            <button className="content_button" onClick={remove}>
	    Remove Client
	</button>
	    </div>
	    </div>

	{notif}
	</div>
    );
}
