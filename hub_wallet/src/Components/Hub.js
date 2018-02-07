import React, { Component } from 'react';
// import { request } from 'graphql-request';
import axios from 'axios';
import commaNumber from 'comma-number';
// import AdSense from 'react-adsense';
import Sidebar from './Sidebar';
import Coincard from './Coincard';
import Statusbar from './Statusbar';

class Hub extends Component { 

	constructor(props){
		super(props)
		this.state = { dataReceived: false }
		this.renderCoinCards = this.renderCoinCards.bind(this);
		this.renderStatusBar = this.renderStatusBar.bind(this);
		this.getData = this.getData.bind(this);
		this.checkSign = this.checkSign.bind(this);
	}

	// componentWillMount(){
	// 	this.getData(this.props.user.id);
	// }

	componentWillReceiveProps(nextProps){
  	this.getData(nextProps);
	}	

	componentDidMount(){
		this.getData(this.props.user.id);
	}

	getData(userId) {
			axios.get(`${this.props.url}/api/${userId}/coins`)
				.then(data => {
					// console.log('data is', data.data);
					if (this.state.dataReceived === false){
						this.setState({ savedCoinData: data.data, dataReceived: true })
					}
					else if (this.state.dataReceived === true){
						this.setState({ savedCoinData: data.data })
					}
					this.checkSign();
					}
				)
		}

		renderCoinCards(){
			const renderCoins = [];
			if (this.state.dataReceived === true) {
				this.state.savedCoinData.savedCoinData.map(e => {
					renderCoins.push(
						<Coincard allCoinData={this.state.savedCoinData} user={this.props.user} url={this.props.url} key={e.id} coin={e.coinId} data={e} getData={this.getData}/>
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

		checkSign(){
			if (this.state.dataReceived === true){
					if(this.state.savedCoinData.portfolio.total_roi_percent > 0){
							this.setState({deltaIndicator: 'delta-indicator delta-positive'});
							// return sign;
							}
					else if(this.state.savedCoinData.portfolio.total_roi_percent < 0){
							this.setState({deltaIndicator: 'delta-indicator delta-negative'});
						// return sign;
						}
			}	
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
				<div style={{margin: 1 + '%'}} className="cointaner">
				 <div className="row">
	        	<Sidebar user={this.props.user} url={this.props.url} getData={this.getData} data={this.state.savedCoinData} delta={this.state.deltaIndicator} logout={this.props.logout}/>
	        	<div className="col-md-7 content mt-3 mb-5">
	        		{this.state.dataReceived && <div className="dashhead">
									  <div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">Portfolio</h6>
									    <h2 className="dashhead-title">Overview</h2>
									  </div>
							  <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
							  <div className="statcard p-3">
							  		<span className="statcard-desc">Holdings</span>
  									<h3 className="statcard-number">
    											${commaNumber(this.state.savedCoinData.portfolio.total_npv.toFixed(2))}
    								<small className={this.state.deltaIndicator}>{commaNumber((this.state.savedCoinData.portfolio.total_roi_percent*100).toFixed(2))}%</small>
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Investment</span>
  									<h3 className="statcard-number">
    											${commaNumber(this.state.savedCoinData.portfolio.total_investment.toFixed(2))}
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Gain/Loss</span>
  									<h3 className="statcard-number">
    											${commaNumber(this.state.savedCoinData.portfolio.total_roi_dollars.toFixed(2))}
  									</h3>
								</div>
							  </div>
							</div>}
	        		<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">Current Holdings</h3>
	  					</div>
							<div className="row">
	  							{this.renderCoinCards()}
	  					</div>
						</div>
	        </div>
	       </div>
		)
	}
}

export default Hub; 