import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

import "./Styles/HRRecruitForms.css";

export default function HRRecruitForms(props) {

    const [sectors, setSectors] = useState(<option>None</option>);
    const [roles, setRoles] = useState(<option>None</option>);
    const [clients, setClients] = useState(<option>None</option>);
    const [emp, setEmp] = useState();
    const [RecruitNotif, setRecruitNotif] = useState();
    const [ModNotif, setModNotif] = useState();

    const refs = {
	inputDOB: useRef(null),
	inputFirstName: useRef(null),
	inputLastName: useRef(null),
	inputSector: useRef(null),
	inputClient: useRef(null),
	inputRole: useRef(null),
	inputPph: useRef(null)
    };

    const mod_refs = {
	inputId: useRef(null),
	inputSector: useRef(null),
	inputPph: useRef(null),
	inputRole: useRef(null),
	inputClient: useRef(null)
    };

    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get("/api/sector/get")
		.then((res) => {
		    setSectors(() => {
			return(
			    <>
				{res.data.map( ({id,name}) => (
                                    <option key={id} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})

		.catch((err) => {
		    console.log(err.message);
		})

	    axios.get("/api/role/get")
		.then((res) => {
		    setRoles(() => {
			return(
			    <>
				{res.data.map( ({id,name}) => (
                                    <option key={"role_key-".concat(id)} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})
	    
		.catch((err) => {
		    setRecruitNotif(err.message);
		});

	    let client_data = {
		params: {
		    all: true
		}
	    };
	    
	    axios.get("/api/client/get", client_data)
		.then((res) => {
		    setClients(() => {
			return(
			    <>
				{res.data.map(({id,name,noe}) => (
                                    <option key={"client_key-".concat(id)} value={name}>{name}</option>
				))}
			    </>
			);
		    });
		})
	    
		.catch((err) => {
		    setRecruitNotif(err.message);
		});
	}, 1500);

	return () => {
	    clearInterval(interval);
	}
    }, []);

    function recruit() {
	setRecruitNotif(<LOADING />);
	let data = {
	    dob: refs.inputDOB.current.value,
	    first_name: refs.inputFirstName.current.value,
	    last_name: refs.inputLastName.current.value,
	    sector: refs.inputSector.current.value,
	    role: refs.inputRole.current.value,
	    pph: refs.inputPph.current.value,
	    client: refs.inputClient.current.value
	};
	
	axios.post("/api/employee/recruit", data)
	    .then((res) => {
		setRecruitNotif(res.data);
	    })
	    .catch((err) => {
		setRecruitNotif(err.data.message);
	    });

	refs.inputDOB.current.value = "";
	refs.inputFirstName.current.value = "";
	refs.inputLastName.current.value = "";
	refs.inputPph.current.value = "";
    }

    function modify() {
	setModNotif(<LOADING />);
	
	let data = new FormData();
	data.append("id", mod_refs.inputId.current.value);
	data.append("sector", mod_refs.inputSector.current.value);
	data.append("role", mod_refs.inputRole.current.value);
	data.append("pph", mod_refs.inputPph.current.value);
	data.append("client", mod_refs.inputClient.current.value);

	axios.patch("/api/employee/modify", data)
	    .then((res) => {
		setModNotif(res.data);
	    })
	    .catch((err) => {
		console.log(err.message);
	    });
    }
    
    return(
        <div id="HRRecruitForms">
            <div className="FormEntry">
                <h2>Recruit: </h2>
		<div className="HRForm">
                    <label for="dob">Date of Birth: </label>
		    <input style={{textAlign: "center"}} ref={refs.inputDOB}name="dob" type="date"/>
		</div>
		<div className="HRForm">
                    <label for="first_name">First Name: </label>
		    <input ref={refs.inputFirstName} name="first_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="last_name">Last Name: </label>
		    <input ref={refs.inputLastName} name="last_name" type="text"/>
		</div>
		<div className="HRForm">
                    <label for="pph">Hourly Price: </label>
		    <input ref={refs.inputPph} name="pph" type="number"/>
		</div>
		<div className="HRForm">
                    <label for="sector">Sector: </label>
                    <select ref={refs.inputSector} name="sector">
			{sectors}
                    </select>
		</div>
		<div className="HRForm">
                    <label for="role">Role: </label>
                    <select ref={refs.inputRole} name="role">
			{roles}
                    </select>
		</div>
		<div className="HRForm">
                    <label for="client">Client: </label>
                    <select ref={refs.inputClient} name="client">
			{clients}
                    </select>
		</div>
                <div className="button-center">
                    <button className="content_button" onClick={recruit}>Recruit</button>
		</div>
		{RecruitNotif}
	    </div>

	    <div className="FormEntry" style={{
		     justifyContent: "unset" }}>
                <h2>Modify contract: </h2>
		<div className="HRForm">
                    <label for="id">Employee ID: </label>
		    <input ref={mod_refs.inputId} name="id" type="number" onChange={() => {
			       
			       let data = {
				   params: {
				       id: mod_refs.inputId.current.value
				   }
			       };
			       
			       axios.get("/api/employee/get_one", data)
				   .then((res) => {
				       setEmp(() => {
					   return(
                                               <div>
                                                   <p style={{fontWeight: "bold"}}>Current contract: </p>
                                                   <table>
                                                       <tr>
                                                           <th>Name:</th>
                                                           <td>{res.data.first_name} {res.data.last_name}</td>
                                                       </tr>
                                                       <tr>
                                                           <th>Sector: </th>
                                                           <td>{res.data.sector}</td>
                                                       </tr>
                                                       <tr>
                                                           <th>Role: </th>
                                                           <td>{res.data.role}</td>
                                                       </tr>
                                                       <tr>
                                                           <th>Client: </th>
                                                           <td>{res.data.client}</td>
                                                       </tr>
                                                       <tr>
                                                           <th>Hourly rate: </th>
                                                           <td>{res.data.pph}¤</td>
                                                       </tr>
	                                           </table>
					       </div>
					   );
				       })
				   })

				   .catch((err) => {
				       setEmp();
				   });
			   }}/>
		</div>
		<div className="HRForm">
                    <label for="sector">Sector: </label>
                    <select ref={mod_refs.inputSector} name="sector">
			{sectors}
                    </select>
		</div>
                <div className="HRForm">
                    <label for="role">Role:</label>
                    <select ref={mod_refs.inputRole} name="role">
			{roles}
                    </select>
		</div>
		<div className="HRForm">
                    <label for="client">Client:</label>
                    <select ref={mod_refs.inputClient} name="client">
			{clients}
                    </select>
		</div>
                <div className="HRForm">
                    <label for="pph">Hourly price: </label>
                    <input name="pph" type="number" ref={mod_refs.inputPph} />
		</div>
		{emp}
                <div className="button-center">
                    <button className="content_button" onClick={modify}>Modify</button>
		</div>
		{ModNotif}
	    </div>
	</div>
    );
}
