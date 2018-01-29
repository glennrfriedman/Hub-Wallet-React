import React, { Component } from 'react';
// import Websocket from 'react-websocket';
// import axios from 'axios';
// import Chart from 'chart.js';
// import { request } from 'graphql-request';
import commaNumber from 'comma-number';

class Coincard extends Component {

	constructor(props){
		super(props);
		this.state = { rowName: this.props.rowName }
		this.clickCard = this.clickCard.bind(this);
		this.checkDeltaPort = this.checkDeltaPort.bind(this);
		this.checkDeltaPrice = this.checkDeltaPrice.bind(this);
		this.checkStatColor = this.checkStatColor.bind(this);
	}

	componentDidMount(){
		this.checkDeltaPort();
		this.checkDeltaPrice();
		this.checkStatColor();
	}

	checkDeltaPort(){
		if (this.props.data.return_on_investment_percent > 0){
					this.setState({ deltaPort: "delta-indicator delta-positive", statcardPort: "statcard statcard-success p-4 mb-2" }) ;
				}
		else if (this.props.data.return_on_investment_percent < 0){
					this.setState({ deltaPort: "delta-indicator delta-negative", statcardPort: "statcard statcard-danger p-4 mb-2" }) ;
				}
	}

	checkDeltaPrice(){
		if (this.props.data.percent_change_24h > 0){
				this.setState({ deltaPrice: "delta-indicator delta-positive", statcardPort: "statcard statcard-success p-4 mb-2" }) ;
				}
		else if (this.props.data.percent_change_24h < 0){
					this.setState({ deltaPrice: "delta-indicator delta-negative", statcardPrice: "statcard statcard-danger p-4 mb-2" }) ;
				}
	}

	checkStatColor(){
		if ((this.props.data.return_on_investment_percent > 0) && (this.props.data.percent_change_24h > 0)){
			this.setState({ statColor: "statcard statcard-success p-4 mb-2" })
		}
		else if ((this.props.data.return_on_investment_percent > 0) || (this.props.data.percent_change_24h > 0)){
			this.setState({ statColor: "statcard statcard-warning p-4 mb-2" })
		}
		else if ((this.props.data.return_on_investment_percent < 0) && (this.props.data.percent_change_24h < 0)){
			this.setState({ statColor: "statcard statcard-danger p-4 mb-2" })
		}
	}

	clickCard(){
		console.log('card is clicked');
	}

	// test for git
	render(){
		let roi = (commaNumber(this.props.data.return_on_investment_percent) * 100).toFixed(2);
		// console.log('data from props in coincard is', this.props.data);
		// if (this.state.dataReceived === true) {
		// 	console.log('data in redner is', this.state.data )
		// }
		return(
			<div className="col-sm-6">
				<div className={this.state.statColor} onClick={this.clickCard}>
						<span className="statcard-desc">{this.props.data.coin_name}</span>
	 	 				<h3 className="statcard-number">Holding:
	    				${commaNumber(this.props.data.net_present_value.toFixed(2))}
	    			<small className={this.state.deltaPort}>{roi}%</small>
	  				</h3><br></br>
	  				<h3 className="statcard-number">Price: 
	    				${commaNumber(this.props.data.price_usd)}
	    			<small className={this.state.deltaPrice}>{this.props.data.percent_change_24h}%</small>
	  				</h3>
				</div>
			</div>
		)
	}

}

export default Coincard;