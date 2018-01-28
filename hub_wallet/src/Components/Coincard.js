import React, { Component } from 'react';
// import Websocket from 'react-websocket';
import axios from 'axios';
// import Chart from 'chart.js';
// import { request } from 'graphql-request';
import commaNumber from 'comma-number';

class Coincard extends Component {

	constructor(props){
		super(props);
		this.state = { rowName: this.props.rowName }
	}

	componentDidMount(){
		if (this.props.data.percent_change_24h > 0){
					this.setState({ delta: "delta-indicator delta-positive", statcard: "statcard statcard-success p-4 mb-2" }) ;
				}
		else if (this.props.data.percent_change_24h < 0){
					this.setState({ delta: "delta-indicator delta-negative", statcard: "statcard statcard-danger  p-4 mb-2" }) ;
				}
	}

	// test for git
	render(){
		console.log('data from props in coincard is', this.props.data);
		if (this.state.dataReceived === true) {
			console.log('data in redner is', this.state.data )
		}
		return(
			<div className={this.state.statcard}>
					<span className="statcard-desc">{this.props.data.coin_name}</span>
 	 				<h3 className="statcard-number">
    				${commaNumber(this.props.data.price_usd)}
    			<small className={this.state.delta}>{commaNumber(this.props.data.percent_change_24h)}%</small>
  				</h3>
			</div>
		)
	}

}

export default Coincard;