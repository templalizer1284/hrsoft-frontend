import "./Styles/HRIncomeCalculate.css";
import "./Styles/Common.css";

import { useState, useEffect } from "react";
import axios from "axios";

export default function HRIncomeCalculate() {

    const [income, setIncome] = useState();

    useEffect(() => {
	let data = {
	    params: {
		month: 100
	    }
	};
	
	axios.get("/api/income/calculate")
	    .then((res) => {
		setIncome(res.data);
	    })
	
	    .catch((err) => {
		setIncome(err.message);
	    });
    }, []);
    
    return(
        <div id="HRIncomeCalculate">
            <h2>Income calculation</h2>
            <p>Predicted income for current month is: {income} ¤</p>
	</div>
    );
}
