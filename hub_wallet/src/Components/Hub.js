import React, { Component } from 'react';
// import { request } from 'graphql-request';
import axios from 'axios';
import Sidebar from './Sidebar';
import Coincard from './Coincard';
import Statusbar from './Statusbar';

class Hub extends Component { 

	constructor(props){
		super(props)
		this.state = { dataReceived: false }
		this.renderCoinCards = this.renderCoinCards.bind(this);
		this.renderStatusBar = this.renderStatusBar.bind(this);
	}

	componentDidMount(){
		this.getData();
		console.log('this.state.savedCoinData is ', this.state.savedCoinData)
	}	

	getData() {
			axios.get(`http://localhost:8080/api/${this.props.user.id}/coins`)
				.then(data => {
					// console.log('data is', data.data);
					this.setState({savedCoinData: data.data, dataReceived: true})
					}
				)
		}

		renderCoinCards(){
			const renderCoins = [];
			let delta = '';
			if (this.state.dataReceived === true) {
				this.state.savedCoinData.savedCoinData.map(e => {
					renderCoins.push(
						<Coincard key={e.id} coin={e.coinId} data={e} />
					)
					return renderCoins
				})
			}
				return renderCoins
			} 

		renderStatusBar(){
			if (this.state.dataReceived === true){
				return (
					<Statusbar data={this.state.savedCoinData.portfolio} />
				)
			}
		}

	render(){
		if (this.state.dataReceived === true) {
			console.log('saved coin data is ', this.state.savedCoinData.savedCoinData);
			console.log('portfolio data is ', this.state.savedCoinData.portfolio);
		}
		return (
				<div className="cointaner">
				 <div className="row">
	        <Sidebar user={this.props.user} url={this.props.url}/>
	        	<div className="col-md-7 content hr-divider mt-3 mb-5">
	  					<h3 className="hr-divider-content hr-divider-heading">Current Holdings</h3>
	  					<div>
	  						{this.renderStatusBar()}
	  					</div>
								<div className="hr-divider">
								  <h3 className="hr-divider-content hr-divider-heading">
								    MY COINS
								  </h3>
								</div>
	  						{this.renderCoinCards()}
						</div>
	        </div>
	      </div>
		)
	}
}

export default Hub; 