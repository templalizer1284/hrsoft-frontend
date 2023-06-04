import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HREmployeeList() {

    const [content, setContent] = useState(<LOADING />);
    
    useEffect(() => {
	const interval = setInterval(() => {
	    let data = {
		params: {
		    all: true
		}
	    };
	    axios.get("/api/employee/get", data)
		.then((res) => {
		    setContent(() => {
			return(
				<>
				{res.data.map( ({id,dob,first_name,last_name,sector,role,pph,client}) => (
					<div key={id} className="employee_list_entry">
                                        <div>ID: <span style={{textDecoration: "underline"}}>{id}</span></div>
                                        <div>Name: <span style={{fontWeight: "bold"}}>{first_name} {last_name}</span></div>
                                        <div>DOB: {dob}</div>
                                        <div>Hourly Price: {pph}</div>
					<div>Sector: {sector}</div>
                                        <div>Role: {role}</div>
                                        <div>Client: {client}</div>
					</div>
				))}
			    </>
			);
		    }); 
		})
		.catch((err) => {
		    setContent(err.message);
		});
	}, 1000);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
            <div id="HREmployeeList">
            <h2>Employee List</h2>
	    {content}
	</div>
    );
}
