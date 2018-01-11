import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Coincard from './Coincard';

class Hub extends Component { 

	// steps to render all coins 

	// 1 
	// set up coinsearch function - this MAY be another resolver function but it will return the coinName and coinID
	// 2
	// coinId will then be saved to GraphQL - Graph.cool DB with CoinName and CoinId 
	// make query to DB to get all saved coinIds 
	// 3 
	// create .map function that will return <Coincard coin={coinId}> for all saved coins a user has 

	render(){
		return (
			<div className="cointaner">
        <Sidebar />
        <Coincard coin='eos'/>
        <Coincard coin='bitcoin'/>
        <Coincard coin='ethereum'/>
        <Coincard coin='golem'/>
        <Coincard coin='bitcoin-cash'/>
        <Coincard coin='funfair'/>
        <Coincard coin='litecoin'/>
      </div>
		)
	}
}

export default Hub; 