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
					this.setState({ delta: "delta-indicator delta-positive", statcard: "statcard statcard-success" }) ;
				}
		else if (this.props.data.percent_change_24h < 0){
					this.setState({ delta: "delta-indicator delta-negative", statcard: "statcard statcard-danger" }) ;
				}
	}

	// test for git
	render(){
		console.log('data from props in coincard is', this.props.data);
		if (this.state.dataReceived === true) {
			console.log('data in redner is', this.state.data )
		}
		const statcardStyle = {
			display: "block",
			overflow: "hidden", 
			border: 0 + "px",
			margin: 0 + "px",
			top: 0 + "px",
			left: 0 + "px", 
			bottom: 0 + "px",
			right: 0 + "px", 
			height: 100 + "%",
			width: 100 + "%",
			position: "absolute", 
			zIndex: -1
		}
		return(
    	<div className={this.state.statcard}>
      	<div className="p-3">
        	<span className="statcard-desc">{this.props.data.name}</span>
        	<h2 className="statcard-number">
          	${commaNumber(this.props.data.price_usd)}
        <small className={this.state.delta}>{commaNumber(this.props.data.percent_change_24h)}%</small>
        </h2>
        	<hr className="statcard-hr mb-0"></hr>
      	</div>
    	</div>
		)
	}

}

export default Coincard;