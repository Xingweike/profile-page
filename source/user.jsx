
import React from 'react';
import ReactDOM from "react-dom";

import './css/user.css';

import Login from './components/Login.jsx';
import Logout from './components/Logout.jsx';
import Register from './components/Register.jsx';
import Profile from './components/Profile.jsx';


class UserApp extends React.Component
{
	constructor(props)
	{
		super(props);

		console.log("props:", this.props);

		this.state = {active:this.props.active};
	}

	open_register() {
		this.setState({active: "register"});
	}

	open_login() {
		this.setState({active: "login"});
	}

	open_profile() {
		this.setState({active: "profile"});
	}

	componentDidMount() {
	}

	on_success(user)
	{
		console.log(success);
	}

	on_cancel(err)
	{
		console.log(cancel);
	}

	render ()
	{
		return (
			<React.Fragment>

				<Login ref='Login' isDisplay={this.state.active=="login"?true:false} userApp={this} />
				<Logout ref='Logout' isDisplay={this.state.active=="logout"?true:false} userApp={this} />
				<Register ref='Register' isDisplay={this.state.active=="register"?true:false} userApp={this} />
				<Profile ref='Profile' isDisplay={this.state.active=="profile"?true:false} userApp={this} />


		  	</React.Fragment>
		);
	}
}

var pageUrl = decodeURIComponent(window.location);
		var pageSplit = pageUrl.split('?');
		if (pageSplit[1]) {
			pageSplit = pageSplit[1].split('&');
			var active = pageSplit[0];
		}

console.log("active:", active);

if (!active) {
	active = "login";
}

let userApp = ReactDOM.render(
	<UserApp active={active} />,
	document.querySelector("#user-wrapper")
);

console.log("---------* * *--------");


