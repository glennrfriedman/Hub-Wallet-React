import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine} from 'recharts';
import commaNumber from 'comma-number';
import Sidebar from './Sidebar';

class Portfolio extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.routeProps.location.state.data, chartData: [], user:  this.props.routeProps.location.state.user, renderBar: true }
		this.createChartObj = this.createChartObj.bind(this);
		// this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		this.createChartObj();
	}

	createChartObj(){
		let chartData = [];
		// console.log('data in portfolio createChartObj is', this.state.data)
		this.state.data.savedCoinData.forEach(function(coin){
			let investment = coin.investment.toFixed(2);
			let net_present_value = coin.net_present_value.toFixed(2)
			let return_on_investment_dollars = coin.return_on_investment_dollars.toFixed(2)
			chartData.push({
				Coin: coin.coin_name,
				Investment: investment,
				PV: net_present_value,
				Return: return_on_investment_dollars
			})
			return chartData;
		})
		return chartData;
	}

	render(){
		console.log(this.state.user)
		console.log('chartData in render is ', this.state.chartData)
		// console.log('data in portfolio is', this.state.data);
		let style = {
			  boxSizing: "border-box",
  			padding: 10 + "px",
  			width: 800 + "px",
  			height: 800 + "px",
  			backgroundColor: "#fff"
		}
		// const data = [
  //     {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  //     {name: 'Page B', uv: 3000, pv: 1398, amt: 2210}, 
  //     {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  //     {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  //     {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  //     {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  //     {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
		// 	]
		let data = this.createChartObj();
		return(
			<div style={{margin: 1 + '%'}} className="container">
				<div className="row">
					<Sidebar user={this.props.user} url={this.props.url} />
						<div className="col-md-7 content mt-3 mb-5">
								<div className="dashhead">
											  <div className="dashhead-titles">
											    <h6 className="dashhead-subtitle">Hub</h6>
											    <h2 className="dashhead-title">Portfolio</h2>
											  </div>
									  <div className="dashhead-toolbar" style={{display: "flex", flexDirection: "row"}}>
										<div className="statcard p-3">
									  		<span className="statcard-desc">Holdings</span>
		  									<h3 className="statcard-number">
		    											${commaNumber(this.state.data.portfolio.total_npv.toFixed(2))}
		  									</h3>
										</div>
									  </div>
									</div>
									{/*<div className="hr-divider">
			  						<h3 className="hr-divider-content hr-divider-heading">{this.state.user.first_name} {this.state.user.last_name}'s Portfolio</h3>
			  					</div>*/}
			  					<div class="hr-divider my-4">
												<ul class="nav nav-pills hr-divider-content hr-divider-nav" role="tablist">
												  <li class="nav-item" role="presentation">
												     <a class="nav-link active" role="tab" data-toggle="tab" aria-controls="sales">Return</a>
												  </li>
												  <li class="nav-item" role="presentation">
												     <a class="nav-link" role="tab" data-toggle="tab" aria-controls="inventory">Diversity</a>
												  </li>
												  <li class="nav-item" role="presentation">
												      <a class="nav-link" role="tab" data-toggle="tab" aria-controls="profit">Health</a>
												   </li>
													</ul>
											</div>
													{this.state.renderBar &&
													<div className="row"> 
													<div style={style}>
													<BarChart width={600} height={300} data={data} stackOffset="sign"
										            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
										       <XAxis dataKey="Coin"/>
										       <YAxis/>
										       <CartesianGrid strokeDasharray="3 3"/>
										       <Tooltip/>
										       <Legend/>
										       <ReferenceLine y={0} stroke='#000'/>
										       <Bar dataKey="Investment" fill="#046DB2" stackId="stack" />
										       <Bar dataKey="Return" fill="#1AB24B" stackId="stack" />
										      </BarChart>
										     	</div>
										      </div>}
								    </div>
								 </div>
      			</div>
			)
	}

}

export default Portfolio