import React, { Component } from 'react';
import axios from 'axios';
import commaNumber from 'comma-number';

import Sidebar from './Sidebar';
import MarketTable from './MarketTable';

const URL = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
const MARKETURL = "https://api.coinmarketcap.com/v1/global/?convert=USD";

class Ticker extends Component {

	constructor(props){
		super(props);
		this.state = {
			url: URL,
			marketUrl: MARKETURL,
			tickerData: [],
			marketData: [],
			// allCoinData: this.props.routeProps.location.state.data,
			dataReceived: false
		}
		this.getTickerData = this.getTickerData.bind(this);
		this.getMarketData = this.getMarketData.bind(this);
	}

	componentDidMount(){
		this.getTickerData();
		this.getMarketData();
	}

	getTickerData() {
		axios.get(this.state.url)
		.then(data => {
			this.setState({ tickerData: data.data, dataReceived: true});
			console.log('data from ticker is', data.data);
		})
	}

	getMarketData() {
		axios.get(this.state.marketUrl)
		.then(data => {
			this.setState({ marketData: data.data });
			console.log('data from market is', data.data);
		})
	}

	render(){
		// console.log('table data in render is', this.state.tableData);
		return(
					<div className="col-lg-8 content mt-3 mb-5">
						<div class="column">
	        	<div className="dashhead">
									<div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">Hub</h6>
									    <h2 className="dashhead-title">Market Data</h2>
									 </div>
								</div>
						</div>
						<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">Current Market Data</h3>
	  				</div>
	  			{this.state.dataReceived &&	
	  					<MarketTable tickerData={this.state.tickerData} marketData={this.state.marketData} /> }
	  		</div>
			)
	}


}

export default Ticker;