import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import '../dist/toolkit-light.min.css';
import Login from './Login';
import Signup from './Signup';

class Landing extends Component {

	constructor(props){
		super(props);
		this.state = { newUser: false }
	}

	toggleMode(event){
	event.preventDefault();
	this.setState(prev => {
			prev.newUser = prev.newUser === false ? true : false;
			return prev
		})
	}

render(){
	return(
		<div className="container">
		<Jumbotron>
    	<h1>Hub Wallet<span className="icon icon-wallet sidebar-brand-icon"></span></h1>
    	<p>
      	Welcome to Hub Wallet! The Coin Market Cap companion application.
      	Sign Up or Log In below to start tracking your crypto investment the right way. 
    	</p>
    </Jumbotron>
			{this.state.newUser === false ? (
				<Login {...this.props} toggleMode={this.toggleMode.bind(this)}/>
				) : (
				<Signup {...this.props} toggleMode={this.toggleMode.bind(this)}/>
				)}
		</div>
		)
	}
}

export default Landing;