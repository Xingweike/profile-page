
import React, {Component} from 'react';


class Login extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {err:null};
	}

	on_login_clicked = ()=> {
		var email = document.getElementById("login-email").value;
		var password = document.getElementById("login-password").value;

		// redis login
		console.log('logging in!');
		var xmlhttp = new XMLHttpRequest();
		var registerString = "email=" + email + "&password=" + password;
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState === 4) {
		        if (xmlhttp.status === 200) {
		        	var user = JSON.parse(xmlhttp.responseText);
		        	console.log(user.bool);
		        	if (user.bool){
		        		alert("login in")
						window.location.replace("/user.html?profile");
		        	} else {
		        		alert("incorrect username or password");
		        	}
	            } else {
	                alert('failure! login.jsx');
	            }
	        }		        
		};
		xmlhttp.open("GET",'/l.html?' + registerString);
		xmlhttp.send();
		return;
	}

    on_register_clicked = ()=> {
        window.location.replace("/user.html?register");
    }

	componentDidMount() {
        console.log('this mounted');
    }
	
	render ()
	{
		return (
			<div id="holder-login" className="container" style={{display:this.props.isDisplay?'block':'none'}}>
				<section className="form-login">
					<div className="form-group">
						<input id="login-email" className="form-control" type="email" placeholder="email address" required="" />
					</div>
					<div className="form-group">
						<input id="login-password" className="form-control" type="password" placeholder="password" required="" />
					</div>
					<button id="submitBtn" onClick={this.on_login_clicked}>Login</button>
				</section>


                <button id="registerBtn" onClick={this.on_register_clicked}>register</button>
			</div>
			
		);
	}
}


export default Login;

