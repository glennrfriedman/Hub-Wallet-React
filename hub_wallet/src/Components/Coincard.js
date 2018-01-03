import React, { Component } from 'react';

class Coincard extends Component {

	constructor(props){
		super(props);
		this.state = { rowName: this.props.rowName }
	}

	

	render(){
		return(
			<div className="col-md-3 ">
  			<h3 class="hr-divider-content hr-divider-heading">
    			{this.state.rowName}
  			</h3>
        <h2 className="statcard-number">
          1,293
          <small className="delta-indicator delta-positive">5%</small>
        </h2>
      </div>
		)
	}

}

export default Coincard;