
import React, {Component} from 'react';


class Register extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {err:null};
	}

	on_register_clicked = (e) =>
	{
		var firstname = document.getElementById("first-name").value;
		var lastname = document.getElementById("last-name").value;
		var email = document.getElementById("register-email").value;
		var password = document.getElementById("register-password").value;
		var pass_confirm = document.getElementById("repeat-register-password").value;

		if (password!=pass_confirm) {
			alert("passwords do not match");
			return;
		}

		if (firstname&&lastname&&email&&password) {

			// redis register
			console.log('registering!');
			var xmlhttp = new XMLHttpRequest();
			var registerString = "firstname=" + firstname + "&lastname=" +  lastname + "&email=" + email + "&password=" + password;

			xmlhttp.onreadystatechange = function() {
			        if (xmlhttp.readyState === 4) {
			            if (xmlhttp.status === 200) {
			                alert('response:'+xmlhttp.responseText);
			                window.location.replace("/user.html?login");
			            } else {
			                alert('failure! register.jsx');
			            }
			        }
			};

			xmlhttp.open("POST",'/r.html?' + registerString);
			xmlhttp.send();

			alert(xmlhttp.responseText);
			return;
		}

		

		this.setState({err:"Finish all fields."});
	};

    on_login_clicked = ()=> {
        window.location.replace("/user.html?login");
    }

	render ()
	{
		return (
			<div id="holder-login" className="container" style={{display:this.props.isDisplay?'block':'none'}}>
				<section className="form-signup">
					<div className="form-group">
						<input id="first-name" className="form-control" type="text" maxLength="32" placeholder="First Name" />
					</div>
					<div className="form-group">
						<input id="last-name" className="form-control" type="text" maxLength="32" placeholder="Last Name" />
					</div>
					<div className="form-group clearfix">
						<input id="register-email" className="form-control" type="email" maxLength="32" placeholder="Email Address" />
					</div>
					<div className="form-group clearfix">
						<input id="register-password" className="form-control" type="password" maxLength="16" placeholder="Password" />
					</div>
					<div className="form-group clearfix">
						<input id="repeat-register-password" className="form-control" type="password" maxLength="16"  placeholder="Confirm password" />
					</div>
					<button id="registerBtn" onClick={this.on_register_clicked}>Register</button>
				</section>

                <button id="loginBtn" onClick={this.on_login_clicked}>login</button>
			</div>
		);
	}
}


export default Register;

