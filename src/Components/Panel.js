import { useState, useRef, useEffect } from "react";

import axios from "axios";
import { LOADING, WARNING } from "./Common.js";

// Components
import HRRecruitForms from "./HRRecruitForms.js";
import HRPanelButton from "./HRPanelButton.js";
import HRTermination from "./HRTermination.js";
import HREmployeeList from "./HREmployeeList.js";
import HRListExpenses from "./HRListExpenses.js";
import HRExpensesCalculate from "./HRExpensesCalculate.js";
import HRExpensesInvoice from "./HRExpensesInvoice.js";
import HRSectorsManage from "./HRSectorsManage.js";
import HRExpensesManage from "./HRExpensesManage.js";
import HRManageClients from "./HRManageClients.js";
import HRRolesManage from "./HRRolesManage.js";
import HRIncomeCalculate from "./HRIncomeCalculate.js";
import HRIncomeManage from "./HRIncomeManage.js";

import "./Styles/HRPanel.css";

export default function PANEL(props) {
    return(
        <div id="HRPanel">
	    <div>
		<a id="HRPanelHead" href={"/"}>HRSoft</a>
	    </div>

	    <div className="HRPanelButtonSection" style={{marginTop: 50}}>
	    </div>
            <p className="HRPanelCategory">Employees</p>
            <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Termination"
		    setter={props.setter}
		    content={<HRTermination />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Recruitment"
		    setter={props.setter}
		    content={<HRRecruitForms />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="List"
		    setter={props.setter}
		    content={<HREmployeeList />}
		/>
	    </div>

            <p className="HRPanelCategory">Sectors/Roles</p>
            <div classname="HRPanelButtonSection">
		<HRPanelButton
		    name="Manage Sectors"
		    setter={props.setter}
		    content={<HRSectorsManage />}
		/>
	    </div>

            <div className="HRPanelButtonSect">
		<HRPanelButton
		    name="Manage Roles"
		    setter={props.setter}
		    content={<HRRolesManage />}
		/>
	    </div>
	    
            <p className="HRPanelCategory">Expenses</p>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Manage Expenses"
		    setter={props.setter}
		    content={<HRExpensesManage />}
		/>
	    </div>
            <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="List of Expenses"
		    setter={props.setter}
		    content={<HRListExpenses />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Calculate"
		    setter={props.setter}
		    content={<HRExpensesCalculate />}
		/>
	    </div>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Invoice"
		    setter={props.setter}
		    content={<HRExpensesInvoice />}
		/>
	    </div>

	    <p className="HRPanelCategory">Clients</p>
	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Manage Clients"
		    setter={props.setter}
		    content={<HRManageClients />}
		/>
	    </div>

            <p className="HRPanelCategory">Income</p>
            <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Calculate income"
		    setter={props.setter}
		    content={<HRIncomeCalculate />}
		/>
	    </div>

	    <div className="HRPanelButtonSection">
		<HRPanelButton
		    name="Manage Income"
		    setter={props.setter}
		    content={<HRIncomeManage />}
		/>
	    </div>
	</div>
    );
}
