import React, { Component } from "react";
import Sidebar from './Sidebar';

class Onecoin extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.routeProps.location.state.data  }
	}

	componentDidMount(){
		console.log('data in Onecoin is', this.state.data )
	}

	render(){
		return(
			<div style={{margin: 1 + '%'}} className="container">
			<div className="row">
				<Sidebar user={this.props.user} url={this.props.url} />
					<div className="col-md-7 content mt-3 mb-5">
	        	<div className="dashhead">
									  <div className="dashhead-titles">
									    <h6 className="dashhead-subtitle">Portfolio</h6>
									    <h2 className="dashhead-title">Overview</h2>
									  </div>
							  <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
							  <div className="statcard p-3">
							  		<span className="statcard-desc">Holdings</span>
  									<h3 className="statcard-number">
    											1000
    								
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Investment</span>
  									<h3 className="statcard-number">
    											1000
  									</h3>
								</div>
								<div className="statcard p-3">
							  		<span className="statcard-desc">Gain/Loss</span>
  									<h3 className="statcard-number">
    											1000
  									</h3>
								</div>
							  </div>
							</div>
						</div>
					</div>
				</div>
			)
	}

}	

export default Onecoin;