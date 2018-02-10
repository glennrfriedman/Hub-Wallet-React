import React, { Component } from "react";
import commaNumber from 'comma-number';
// import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Sidebar from './Sidebar';

class Onecoin extends Component {

	constructor(props){
		super(props);
		this.state = { 
					data: this.props.routeProps.location.state.data, 
					allCoinData: this.props.routeProps.location.state.allCoinData, 
					deltaPort: this.props.routeProps.location.state.deltaPort
				}
		this.createBarData = this.createBarData.bind(this);
		this.assignRowStyle = this.assignRowStyle.bind(this);
		// this.getData = this.getData.bind(this);
	}

	componentDidMount(){
		// console.log('data in Onecoin is', this.state.data );
		// console.log('routeProps in oneCoin are', this.props.routeProps);
		// console.log('getData in oneCoin is', this.props.routeProps.location.getData);
		this.createBarData();
		// let getter = document.getElementById('getter').style.color;
		// console.log('getter is ', getter);
	}

	assignRowStyle(number){
		let gain = {color: "#11E20C"}
		let loss = {color: "#FF0215"}
		if (number > 0){
			return gain;
		}
		else if (number < 0){
			return loss;
		}
	}

	createBarData(){
		let barChartData = {
					labels: [this.state.data.coin_name], 
					datasets: [ { 
						label: 'Investment', 
						backgroundColor: "#5C99B3",
						data: []  
					},
					{
						label: 'Current Holdings', 
						data: [],
						backgroundColor: 'rgba(255, 159, 64, 0.6)'
					},
					{ 
						label: 'Return', 
						data: [],
						backgroundColor: "#71B37C"
					} ] };
				
				let investment = this.state.data.investment.toFixed(2)
				let net_present_value = this.state.data.net_present_value.toFixed(2)
				let return_on_investment_dollars = this.state.data.return_on_investment_dollars.toFixed(2)
				barChartData.datasets[0].data.push(investment);
				barChartData.datasets[2].data.push(return_on_investment_dollars);
				barChartData.datasets[1].data.push(net_present_value);
				this.setState({barChartData: barChartData});
	}

	render(){
		console.log('data in one coin render is ', this.state.data)
		let roi = (commaNumber(this.state.data.return_on_investment_percent) * 100).toFixed(2);
		let return_on_investment_dollars = (this.state.data.return_on_investment_dollars).toFixed(2);
		let net_present_value = (this.state.data.net_present_value).toFixed(2);
		let price_usd = (this.state.data.price_usd * 1).toFixed(2);
		let price_per_share = (this.state.data.price_per_share).toFixed(2);
		let { percent_change_1h, percent_change_24h, percent_change_7d } = this.state.data;
		let price_per_share_change = (price_usd - price_per_share).toFixed(2);
		return(
			<div style={{margin: 1 + '%'}} className="row">
				<Sidebar logout={this.props.logout} data={this.state.allCoinData} user={this.props.user} url={this.props.url} getData={this.props.routeProps.location.getData} />
					<div className="col-md-7 content mt-3 mb-5">
	        	<div className="dashhead">
									  <div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">{this.state.data.coin_name}</h6>
									    <h2 className="dashhead-title">Overview</h2>
									  </div>
							  <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Holdings</span>
  									<h3 className="statcard-number">
    											${commaNumber(net_present_value)}
    											<small className={this.state.deltaPort}>{roi}%</small>
  									</h3>
  									<small>Acquired: {this.state.data.date_of_transaction}</small>
								</div>
							  </div>
							</div>
							<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">{this.state.data.coin_name} Data</h3>
	  					</div>
	  					<div className="row"> 
										     	<Bar
											          data={this.state.barChartData}
											          options={{
											            title:{
											              display:true,
											              text: 'Return and Investment Dollars',
											              fontSize:25
											            },
											            legend:{
											              display:true,
											              position:"bottom"
											            },
											            responsive: true
											          }}
											        />
								</div>
								<div style={{marginTop: 2 + "%"}} className="list-group mb-3">
											<h3 className="list-group-header">{this.state.data.coin_name} ({this.state.data.symbol})</h3>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Market Capitalization</span>
												<span>${commaNumber(this.state.data.market_cap_usd)}</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Shares Owned</span>
												<span>{commaNumber(this.state.data.shares)}</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Purchase Price per Share</span>
												<span>${commaNumber(price_per_share)}</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Current Price per Share</span>
												<span>${commaNumber(price_usd)}</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Dollar Change in Price per Share (Holdings)</span>
												<span style={this.assignRowStyle(this.state.data.price_per_share_change)}>${commaNumber(price_per_share_change)}</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Percent Change in Price per Share (1h)</span>
												<span style={this.assignRowStyle(this.state.data.percent_change_1h)}>{commaNumber(percent_change_1h)}%</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Percent Change in Price per Share (24h)</span>
												<span style={this.assignRowStyle(this.state.data.percent_change_24h)}>{commaNumber(percent_change_24h)}%</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Percent Change in Price per Share (7d)</span>
												<span style={this.assignRowStyle(this.state.data.percent_change_7d)}>{commaNumber(percent_change_7d)}%</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Return on Investment Percent</span>
												<span style={this.assignRowStyle(this.state.data.return_on_investment_percent)}>{roi}%</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Return on Investment Dollars</span>
												<span style={this.assignRowStyle(this.state.data.return_on_investment_dollars)}>${commaNumber(return_on_investment_dollars)}</span>
											</p>
											<p className="list-group-item list-group-item-action justify-content-between d-flex">
												<span>Current Price BTC</span>
												<span>{commaNumber(this.state.data.price_btc)}</span>
											</p>
										</div>
									</div>
					</div>
			)
	}

}	

export default Onecoin;