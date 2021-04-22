
import React, {Component} from 'react';

class Logout extends React.Component
{
	constructor(props){
		super(props);
		this.state = {err:null};

	}

	on_logout_clicked = (e)=>
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState === 4) {
		        if (xmlhttp.status === 200) {
		        	if (xmlhttp.responseText){
						alert("logout");
						window.location.replace("/user.html?login");
		        	}
	            } else {
	                alert('failure logout!');
	            }
	        }		        
		};
		xmlhttp.open("GET",'/lo.html?');
		xmlhttp.send();	
	};

	render ()
	{
		return (
	        <div id="holder-login" className="container" style={{display:this.props.isDisplay?'block':'none'}}>
	            <h3>Logout？</h3>
				<button id="submitBtn" onClick={this.on_logout_clicked}>Logout</button>
	        </div>
		);
	}
}


export default Logout;

