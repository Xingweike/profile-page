
import React, {Component} from 'react';
//import UserApp from './../user.jsx'

import Avatar from './Avatar.jsx';


class Profile extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			err:null,
			firstname: null,
			lastname: null,
			email: null,
			password: null,
			avatar: null
		};
	}

	componentDidMount() {
		var self = this;
        var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState === 4) {
		        if (xmlhttp.status === 200) {
		        	var user = JSON.parse(xmlhttp.responseText);
		        	if (user.firstname != null){
						self.setState({
				         	firstname: user.firstname,
				        	lastname: user.lastname,
				        	email: user.email,
				        	password: user.password,
							avatar: user.avatar
				        });
				        console.log("states set!" + user.firstname);
				        console.log("Avatar: /avatar/" + self.state.avatar);
		        	} else {
		        		console.log("redirecting")
		        		//UserApp.open_login();
		        	}
	            } else {
	                window.location.replace("/user.html?login");
	            }
	        }		        
		};
		xmlhttp.open("GET",'/p.html?');
		xmlhttp.send();
		return;
      }

	on_logout_clicked = (e) =>
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState === 4) {
		        if (xmlhttp.status === 200) {
		        	window.location.replace("/user.html?login");
		        }
	        }		        
		};

		xmlhttp.open("GET",'/lo.html?');
		xmlhttp.send();

		alert("profile logout clicked");
		return;
	};

	signOut() {
	    var auth2 = gapi.auth2.getAuthInstance();
	    auth2.signOut().then(function () {
	      console.log('User signed out.');
	    });
	}

	render ()
	{
		var avatar_path = '/images/'+this.state.avatar;
		return (
			<div id="holder-login" className="container" style={{display:this.props.isDisplay?'block':'none'}}>
					<h1>Welcome {this.state.firstname} {this.state.lastname}</h1>
					<h1>Email: {this.state.email}</h1>

					<img alt="" src={avatar_path} />

					<p></p>
					<button id="logoutBtn" onClick={this.on_logout_clicked}>logout<div className="notice" style={{display: this.state.err?'block':'none'}}>{this.state.err}</div>
					</button>


					<p></p>
					<p>upload an avatar!</p>
					<Avatar ref='Avatar'/>

			</div>

			

		);
	}
}


export default Profile;


