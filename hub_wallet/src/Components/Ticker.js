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
			dataReceived: false
		}
		this.getTickerData = this.getTickerData.bind(this);
		this.getMarketData = this.getMarketData.bind(this);
		this.renderTickerData = this.renderTickerData.bind(this);
	}

	componentDidMount(){
		this.getTickerData();
		this.getMarketData();
	}

	getTickerData() {
		axios.get(this.state.url)
		.then(data => {
			this.setState({ tickerData: data.data, dataReceived: true });
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

	renderTickerData(){
		let tickerTable = [];
		this.state.tickerData.map(e => {
					let price_usd = commaNumber(e.price_usd);
					let market_cap_usd = commaNumber(e.market_cap_usd);
					let percent_change_24h = commaNumber(e.percent_change_24h);
					let percent_change_7d = commaNumber(e.percent_change_7d);
					let price_btc = commaNumber(e.price_btc);
					// let volume_usd = "24h_volume_usd"
					// let volume = commaNumber(e.volume_usd);
					tickerTable.push(
									<tr>
					  					<td>{e.rank}</td>			
											<td>{e.name}</td>
											<td>{price_usd}</td>
											<td>{price_btc}</td>
											<td>{market_cap_usd}</td>
											<td>{percent_change_24h}%</td>
											<td>{percent_change_7d}%</td>
								</tr>
					)
					return tickerTable;
				})
		return tickerTable;
	}

	render(){
		console.log('data in render is', this.state.tickerData);
		return(
			<div style={{margin: 1 + '%'}} className="row">
				<Sidebar logout={this.props.logout} data={this.state.allCoinData} user={this.props.user} url={this.props.url} getData={this.props.routeProps.location.getData} />
					<div className="col-lg-8 content mt-3 mb-5">
						<div class="column">
	        	<div className="dashhead">
									<div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">Market</h6>
									    <h2 className="dashhead-title">Hub</h2>
									 </div>
								</div>
						</div>
						<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">Current Market Data</h3>
	  				</div>
	  			{this.state.dataReceived &&
	  					<MarketTable tickerData={this.state.tickerData} marketData={this.state.marketData} /> }
	  		</div>
	  	</div>
			)
	}


}

export default Ticker;