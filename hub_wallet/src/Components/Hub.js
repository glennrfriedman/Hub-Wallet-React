import React, { Component } from 'react';
// import { request } from 'graphql-request';
import commaNumber from 'comma-number';
// import AdSense from 'react-adsense';
import Coincard from './Coincard';

class Hub extends Component { 

	constructor(props){
		super(props)
		this.state = { dataReceived: false, loader: true }
		this.renderCoinCards = this.renderCoinCards.bind(this);
		// this.getData = this.getData.bind(this);
		// this.checkSign = this.checkSign.bind(this);
		this.assignRowStyle = this.assignRowStyle.bind(this);
	}

	// componentWillReceiveProps(nextProps){
 //  	this.props.getUserCoinData(nextProps);
	// }	

	componentDidMount(){
		document.getElementById('sidebar').style.display = "block";
		this.props.getUserCoinData();
	}

	assignRowStyle(number){
		let gain = {color: "#00B145"}
		let loss = {color: "#FF312B"}
		if (number > 0){
			return gain;
		}
		else if (number < 0){
			return loss;
		}
	}

	renderCoinCards(){
			const renderCoins = [];
			if (this.props.dataReceived === true) {
				this.props.savedCoinData.savedCoinData.map(e => {
					renderCoins.push(
						<Coincard allCoinData={this.props.savedCoinData} user={this.props.user} url={this.props.url} key={e.id} coin={e.coinId} data={e} getData={this.props.getUserCoinData}/>
					)
					return renderCoins
				})
			}
				return renderCoins
			} 

	render(){
		// if (this.state.dataReceived === true) {
		// 	console.log('saved coin data is ', this.state.savedCoinData.savedCoinData);
		// 	console.log('portfolio data is ', this.state.savedCoinData.portfolio);
		// }
		// let sign = 'delta-indicator delta-positive'
		// if (this.state.dataReceived === true){
		// 	let total_roi_percent = (this.state.savedCoinData.portfolio.total_roi_percent*100).toFixed(2);
		// }
		return (
	        	<div className="col-md-7 content mt-3 mb-5">
	        		{this.props.dataReceived && <div className="dashhead">
									  <div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">Hub</h6>
									    <h2 className="dashhead-title">Overview</h2>
									  </div>
							  <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
							  <div className="statcard p-3">
							  		<span className="statcard-desc">Holdings</span>
  									<h3 className="statcard-number">
    											${commaNumber(this.props.savedCoinData.portfolio.total_npv.toFixed(2))}
    								<small className={this.props.deltaIndicator}>{commaNumber((this.props.savedCoinData.portfolio.total_roi_percent*100).toFixed(2))}%</small>
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Investment</span>
  									<h3 className="statcard-number">
    											${commaNumber(this.props.savedCoinData.portfolio.total_investment.toFixed(2))}
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Gain/Loss</span>
  									<h3 className="statcard-number" style={this.assignRowStyle(this.props.savedCoinData.portfolio.total_roi_dollars)}>
    											${commaNumber(this.props.savedCoinData.portfolio.total_roi_dollars.toFixed(2))}
  									</h3>
								</div>
							  </div>
							</div>}
	        		<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">Current Holdings</h3>
	  					</div>
							<div className="row">
	  							{this.props.dataReceived && 
	  								this.renderCoinCards()}
	  					</div>
						</div>
	       
		)
	}
}

export default Hub; 