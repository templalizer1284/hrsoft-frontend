import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRSectorsManage() {

    const sector_refs = {
	add_name: useRef(null),
	remove_name: useRef(null)
    };

    const [notif, setNotif] = useState();
    const [sectors, setSectors] = useState(<option>None</option>);

    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get("/api/sector/get")
		.then((res) => {
		    setSectors(() => {
			return(
				<>
				{res.data.map(({id,name}) => (
					<option key={"sector_remove_key-".concat(id)} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})
	    
		.catch((err) => {
		    setNotif(err.message);
		});

	    return () => {
		clearInterval(interval);
	    };
	}, 1000);
    }, []);

    function add() {
	let data = new FormData();
	data.append("name", sector_refs.add_name.current.value);
	axios.post("/api/sector/add", data)
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
		name: sector_refs.remove_name.current.value
	    }
	};

	axios.delete("/api/sector/delete", data)
	    .then((res) => {
		setNotif(res.data);
	    })
	
	    .catch((err) => {
		setNotif(err.message);
	    });
    }
    
    return(
            <div id="HRSectorManage">
            <div className="FormEntry">
            <h2>Add Sector</h2>
            <div className="HRForm">
            <label for="sector_name">Name</label>
            <input name="sector_name" type="text" ref={sector_refs.add_name}/>
	    </div>
	    </div>
            <div className="button-center">
            <button className="content_button" onClick={add}>
	    Add Sector
	</button>
	    </div>
            <div className="FormEntry">
            <h2>Remove Sector</h2>
            <div className="HRForm">
	    <label for="sector_remove_name">Sector: </label>
            <select ref={sector_refs.remove_name} name="sector_remove_name">
	    {sectors}
        </select>
	    </div>
	    </div>
            <div className="button-center">
            <button className="content_button" onClick={remove}>
	    Remove Sector
	</button>
	    </div>
	    {notif}
	</div>
    );
}
