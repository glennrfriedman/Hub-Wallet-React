import React, { Component } from 'react';
// import Websocket from 'react-websocket';
import axios from 'axios';
import Chart from 'chart.js';

class Coincard extends Component {

	constructor(props){
		super(props);
		this.state = { rowName: this.props.rowName, data: {} }
		this.getData = this.getData.bind(this);
	}

	componentDidMount(){
		this.getData();
	}	

	getData() {
		axios.get(`https://api.coinmarketcap.com/v1/ticker/${this.props.coin}/?convert=USD`)
			.then(res => {
				console.log('data from req is', res.data)
				this.setState({ data: res.data[0] })
			})
	}

	render(){
		console.log('data in redner is', this.state.data.price_usd )
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
		const sparkStyle = {
			width: 310 + "px", 
			height: 77 + "px",
			display: "block"
		}

		return(
		<div className="col-md-6 col-xl-3 mb-3 mb-md-4 mb-xl-0">
    <div className="statcard statcard-danger"><iframe title="coinCard" className="chartjs-hidden-iframe" tabIndex="-1" style={statcardStyle}></iframe>
      <div className="p-3">
        <span className="statcard-desc">Downloads</span>
        <h2 className="statcard-number">
          758
          <small className="delta-indicator delta-negative">1.3%</small>
        </h2>
        <hr className="statcard-hr mb-0"></hr>
      </div>
      <canvas id="sparkline1" width="620" height="154" className="sparkline js-chart-drawn" data-chart="spark-line" data-dataset="[[4,34,64,27,96,50,80]]" data-labels="['a','b','c','d','e','f','g']" style={sparkStyle}></canvas>
    </div>
  </div>
		)
	}

}

export default Coincard;