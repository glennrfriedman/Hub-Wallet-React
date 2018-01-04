import React, { Component } from 'react';

class Sidebar extends Component {

	render(){

    const logoStlye = {
      alignSelf: "center"
    }

		return (

			<div className="col-md-3 sidebar">
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
              <span className="sr-only">Toggle nav</span>
            </button>
            <a style={logoStlye} className="sidebar-brand img-responsive" href="index.html">
              <span className="icon icon-wallet sidebar-brand-icon"><span>Hub</span></span>
            </a>
          </div>

          <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
            <form className="sidebar-form">
              <input className="form-control" type="text" placeholder="Search Coins..."></input>
              <button type="submit" className="btn-link">
                <span className="icon icon-magnifying-glass"></span>
              </button>
            	</form>
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">Portfolio</li>
              <li className="nav-item">
                <a className="nav-link active" href="index.html">Current Holdings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="order-history/index.html">Profits & Losses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="fluid/index.html">Tax Calculation</a>
              </li>
            </ul>
            <hr className="visible-xs mt-3"></hr>
          </div>
        </nav>
      </div>
	
		)
	}

}

export default Sidebar;