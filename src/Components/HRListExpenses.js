import { LOADING } from "./Common.js";

import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function HRListExpenses() {

    const [content, setContent] = useState(<LOADING />);
    const [ExpensesNotif, setExpensesNotif] = useState();
    
    useEffect(() => {
	const interval = setInterval(() => {
	    axios.get("/api/expenses/get")
		.then((res) => {
		    setContent(() => {
			return(
				<>
				{res.data.map( ({id,name,price,month,year}) => (
					<div key={id} className="employee_list_entry">
                                        <div>Name: {name}</div>
                                        <div>Price: {price}</div>
                                        {() => {
					    if(month !== 0 && year !== 0){
						return(
							<div>Onetime</div>
						);
					    }
					}}
				    </div>
				))}
			    </>
			);
		    });
		})
		.catch((err) => {
		    setExpensesNotif(err.message);
		});
	}, 1500);

	return () => {
	    clearInterval(interval);
	};
    }, []);
    
    return(
            <div id="HRListExpenses">
            <h2>List of expenses:</h2>
	    {content}
	{ExpensesNotif}
	</div>
    );
}
