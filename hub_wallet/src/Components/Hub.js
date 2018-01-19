import React, { Component } from 'react';
// import { request } from 'graphql-request';
import axios from 'axios';
import Sidebar from './Sidebar';
import Coincard from './Coincard';

class Hub extends Component { 

	constructor(props){
		super(props)
		this.state = { dataReceived: false }
		this.renderCoinCards = this.renderCoinCards.bind(this);
		// this.onSignIn = this.onSignIn.bind(this);
		// this.signOut = this.signOut.bind(this);
	}

	componentDidMount(){
		this.getData();
	}	

	// onSignIn(googleUser) {
 //  	let profile = googleUser.getBasicProfile();
 //  	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
 //  	console.log('Name: ' + profile.getName());
 //  	console.log('Image URL: ' + profile.getImageUrl());
 //  	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	// }

	// signOut() {
 //    let auth2 = gapi.auth2.getAuthInstance();
 //    auth2.signOut().then(function () {
 //      console.log('User signed out.');
 //    });
 //  }	

	getData() {
			axios.get('http://localhost:8080/api/coins')
				.then(data => this.setState({savedCoinData: data.data.savedCoins, currentCoinData: data.data.currentCoinData, dataReceived: true}))
		}

		renderCoinCards(){
			const renderCoins = [];
			// if (this.state.dataReceived === true) {
			// 	this.state.savedCoins.map(e => {
			// 		renderCoins.push(
			// 			<Coincard key={e.id} coin={e.coinId}/>
			// 		)
			// 		return renderCoins
			// 	})
			// }
				return renderCoins
			} 

	// steps to render all coins 

	// 1 
	// set up coinsearch function - this MAY be another resolver function but it will return the coinName and coinID
	// 2
	// coinId will then be saved to GraphQL - Graph.cool DB with CoinName and CoinId 
	// make query to DB to get all saved coinIds 
	// 3 
	// create .map function that will return <Coincard coin={coinId}> for all saved coins a user has 

	render(){
		if (this.state.dataReceived === true) {
			console.log('saved coin data is ', this.state.savedCoinData);
			console.log('current coin data is ', this.state.currentCoinData);
		}
		return (
			<div className="cointaner">
        <Sidebar />
        {/*<div className="g-signin2" data-onsuccess={this.onSignIn()}></div>*/}
        {/*<a href="#" onclick={this.signOut()}>Sign out</a>*/}
        {this.renderCoinCards()}
      </div>
		)
	}
}

export default Hub; 