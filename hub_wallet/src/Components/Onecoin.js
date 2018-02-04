import React, { Component } from "react";
import commaNumber from 'comma-number';

import Sidebar from './Sidebar';


class Onecoin extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.routeProps.location.state.data, allCoinData: this.props.routeProps.location.state.allCoinData }
	}

	componentDidMount(){
		console.log('data in Onecoin is', this.state.data )
	}

	render(){
		let return_on_investment_dollars = (this.state.data.return_on_investment_dollars).toFixed(2);
		let net_present_value = (this.state.data.net_present_value).toFixed(2);
		let price_usd = (this.state.data.price_usd * 1).toFixed(2);
		return(
			<div style={{margin: 1 + '%'}} className="row">
				<Sidebar data={this.state.allCoinData} user={this.props.user} url={this.props.url} />
					<div className="col-md-7 content mt-3 mb-5">
	        	<div className="dashhead">
									  <div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">{this.state.data.coin_name}</h6>
									    <h2 className="dashhead-title">Overview</h2>
									  </div>
							  <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
							  <div className="statcard p-3">
							  		<span className="statcard-desc">Current Price</span>
  									<h3 className="statcard-number">
    											${commaNumber(price_usd)}
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Holdings</span>
  									<h3 className="statcard-number">
    											${commaNumber(net_present_value)}
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Gain/Loss</span>
  									<h3 className="statcard-number">
    											${commaNumber(return_on_investment_dollars)}
  									</h3>
								</div>
							  </div>
							</div>
							<div className="hr-divider">
	  						<h3 className="hr-divider-content hr-divider-heading">Current {this.state.data.coin_name} Data</h3>
	  					</div>
						</div>
					</div>
			)
	}

}	

export default Onecoin;