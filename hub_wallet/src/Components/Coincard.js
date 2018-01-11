import React, { Component } from 'react';
// import Websocket from 'react-websocket';
// import axios from 'axios';
// import Chart from 'chart.js';
import { request } from 'graphql-request';

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
		const query = `
    	{
				getDataByCoin(coin: "${this.props.coin}"){
			  		price_usd
			    	market_cap
			  		hour_change
			  		day_change
			  		week_change
			}  
		}`
  		console.log('query is ', query);
			request('https://api.graph.cool/simple/v1/cjc6hz8or02xe0103b9kg3w7z', query)
				.then(data => this.setState({data: data.getDataByCoin}))
		}

	// getData() {
	// 	axios.get(`https://api.coinmarketcap.com/v1/ticker/${this.props.coin}/?convert=USD`)
	// 		.then(res => {
	// 			console.log('data from req is', res.data)
	// 			this.setState({ data: res.data[0] })
	// 		})
	// }

	render(){
		console.log('data in redner is', this.state.data )
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
		<div className="col-md-6 col-xl-3 mb-3 mb-md-4 mb-xl-0">
    <div className="statcard statcard-danger"><iframe title="coinCard" className="chartjs-hidden-iframe" tabIndex="-1" style={statcardStyle}></iframe>
      <div className="p-3">
        <span className="statcard-desc">{this.props.coin}</span>
        <h2 className="statcard-number">
          {this.state.data.price_usd}
          <small className="delta-indicator delta-negative">{this.state.data.hour_change}</small>
        </h2>
        <hr className="statcard-hr mb-0"></hr>
      </div>
    </div>
  </div>
		)
	}

}

export default Coincard;