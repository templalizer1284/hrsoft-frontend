import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRRolesManage() {
    
    const [notif, setNotif] = useState();
    const [roles, setRoles] = useState();

    const refs = {
	add: useRef(null),
	remove: useRef(null)
    };

    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get("/api/role/get")
		.then((res) => {
		    setRoles(() => {
			return(
				<>
				{res.data.map(({id,name}) => (
					<option key={"role_key-".concat(id)} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})

		.catch((err) => {
		    
		});
	}, 1500);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    function add() {
	let data = new FormData();
	data.append("name", refs.add.current.value);

	axios.post("/api/role/add", data)
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

	axios.delete("/api/role/delete", data)
	    .then((res) => {
		setNotif(res.data);
	    })

	    .catch((err) => {
		setNotif(err.message);
	    });
    }
    
    return(
            <div id="HRManageRoles">
	    <div className="FormEntry">
            <h2>Add Role:</h2>
            <div className="HRForm">
            <label for="role_add_name">Name:</label>
            <input name="role_add_name" type="text" ref={refs.add} />
	    </div>
            <div className="button-center">
            <button className="content_button" onClick={add}>
	    Add Role
	</button>
	    </div>
	    </div>

	    <div className="FormEntry">
            <h2>Delete Role:</h2>
            <div className="HRForm">
            <label for="role_delete_name">Name:</label>
            <select name="role_delete_name" ref={refs.remove}>
	    {roles}
	</select>
	    </div>
            <div className="button-center">
            <button className="content_button" onClick={remove}>
	    Delete Role
	</button>
	    </div>
	    </div>

	</div>
    );
}
