export default function HRPanelButton(props) {
    return(
        <div className="HRPanelButton" onClick={() => {
		 props.setter(props.content);
	     }}>
	    {props.name}
	</div>
    );
}
