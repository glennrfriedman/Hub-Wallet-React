import React, { Component } from 'react';
// import Websocket from 'react-websocket';
import axios from 'axios';

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
		return(
			<div className="col-md-3 ">
  			<h3 className="hr-divider-content hr-divider-heading">
    			{this.state.data.name}
  			</h3>
        <h2 className="statcard-number">
          ${this.state.data.price_usd}
          <small className="delta-indicator delta-positive">{this.state.data.percent_change_24h}%</small>
        </h2>
      </div>
		)
	}

}

export default Coincard;