import React, { Component } from 'react';

class Avatar extends Component {
    constructor() {
    super();
    this.state = {
        selectedFile: ''
    	};
	}

    onChange = (e) => {
    	switch (e.target.name) {
       		case 'selectedFile':
            	this.setState({ selectedFile: e.target.files[0] });
            	break;
          	default:
            	this.setState({ [e.target.name]: e.target.value });
        }
    }

    onSubmit = (e) => {
	    e.preventDefault();
	    const { selectedFile } = this.state;
	    let formData = new FormData();
	    formData.append('selectedFile', selectedFile);

	   
	    var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
		    if (xmlhttp.readyState === 4) {
		        if (xmlhttp.status === 200) {
	        		var user = JSON.parse(xmlhttp.responseText);
		        	console.log(user);
		        	//window.location.reload()

	            } else {
	                alert('failure! avatar.jsx');
	            }
	        }		        
		};
		xmlhttp.open("POST",'/upload');
		xmlhttp.send(formData);
    }

    render() {
    const { description, selectedFile } = this.state;
    return (
        <form onSubmit={this.onSubmit}>
        
        <input
            type="file"
            name="selectedFile"
            onChange={this.onChange}
        />
        <button type="submit">Submit</button>
        </form>
        );
    }
}
export default Avatar;
