import React, { Component } from "react";
import { ProgressBar } from 'react-bootstrap';
import commaNumber from 'comma-number';

class Statusbar extends Component {

	render(){
		let total_investment = '$' + commaNumber(this.props.data.total_investment.toFixed(2));
		let npv = '$' + commaNumber(this.props.data.total_npv);
		let total_roi_dollars = '$' + commaNumber(this.props.data.total_roi_dollars.toFixed(2));
		let inv_width = (this.props.data.total_investment/this.props.data.total_npv) * 100
		let npv_width = (this.props.data.total_roi_dollars/this.props.data.total_npv) * 100
		console.log('with', inv_width, npv_width);
		console.log('total_investment is', total_investment);
		return(
			<div className="progress">
			  <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width: inv_width + "%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">Investment</div>
			  <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" role="progressbar" style={{width: npv_width + "%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">Return</div>
			</div>
			)
	}

}

export default Statusbar;

