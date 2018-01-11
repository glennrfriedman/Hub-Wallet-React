import React, { Component } from 'react';
import { request } from 'graphql-request';

import Sidebar from './Sidebar';
import Coincard from './Coincard';

class Hub extends Component { 

	constructor(props){
		super(props)
		this.state = { coinList: [], dataReceived: false }
		this.renderCoinCards = this.renderCoinCards.bind(this);
	}

	componentDidMount(){
		this.getData();
	}	

	getData() {
		const query = `{
  		allCoins{
		    coinName
		  	id
		  	coinId
		  	investment
		  	shares
		  	user {
		  	  id
		  	}
  		}
		}`
  	console.log('query is ', query);
			request('https://api.graph.cool/simple/v1/cjc6hz8or02xe0103b9kg3w7z', query)
				.then(data => this.setState({coinList: data.allCoins, dataReceived: true}))
		}

		renderCoinCards(){
			const renderCoins = [];
			if (this.state.dataReceived === true) {
				this.state.coinList.map(e => {
					renderCoins.push(
						<Coincard key={e.id} coin={e.coinId}/>
					)
					return renderCoins
				})
			}
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
			console.log('coinlist is ', this.state.coinList)
		}
		return (
			<div className="cointaner">
        <Sidebar />
        {this.renderCoinCards()}
      </div>
		)
	}
}

export default Hub; 