import React, { Component } from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine, PieChart, Pie, Cell} from 'recharts';
import commaNumber from 'comma-number';
import Sidebar from './Sidebar';

class Portfolio extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.routeProps.location.state.data, chartData: [], user:  this.props.routeProps.location.state.user, delta: this.props.routeProps.location.state.delta, renderBar: true }
		this.createChartObj = this.createChartObj.bind(this);
		this.createPieObj = this.createPieObj.bind(this);
		this.createPieObj2 = this.createPieObj2.bind(this);
		this.toggleGraph = this.toggleGraph.bind(this);
		// this.onChange = this.onChange.bind(this);
	}

	componentDidMount(){
		// this.createChartObj();
		// this.createPieObj();
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

	createPieObj(){
		let pieChartData = [];
		this.state.data.savedCoinData.forEach(function(coin){
			let investment = coin.investment
			let net_present_value = coin.net_present_value.toFixed(2)
			let return_on_investment_dollars = coin.return_on_investment_dollars.toFixed(2)
			pieChartData.push({
				Coin: coin.coin_name,
				Investment: investment
			})
			return pieChartData;
		})
		return pieChartData;
	}

	createPieObj2(){
		let returnChartData = [];
		this.state.data.savedCoinData.forEach(function(coin){
			let investment = coin.investment
			let net_present_value = coin.net_present_value.toFixed(2)
			let return_on_investment_dollars = coin.return_on_investment_dollars
			returnChartData.push({
				Coin: coin.coin_name,
				Return: return_on_investment_dollars
			})
			return returnChartData;
		})
		return returnChartData;
	}

	toggleGraph(){
		if (this.state.renderBar === true){
			this.setState({renderBar: false, renderDiv: true})
		}
		else if (this.state.renderBar === false){
			this.setState({renderBar: true, renderDiv: false})
		}
	}

	render(){
		const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
		const RADIAN = Math.PI / 180;                    
		const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
 				const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  			const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  			const y = cy  + radius * Math.sin(-midAngle * RADIAN);
		  return (
		    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
		    	{`${(percent * 100).toFixed(0)}%`}
		    </text>
		  );
	};
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

		const investmentData = this.createPieObj();

		console.log('investmentData is', investmentData);

		const returnData = this.createPieObj2();

		console.log('returnData is', returnData);

		let data = this.createChartObj();
		// let pieData = this.createPieObj();
		return(
				<div style={{margin: 1 + '%'}} className="row">
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
		    											<small className={this.state.delta}>{commaNumber((this.state.data.portfolio.total_roi_percent*100).toFixed(2))}%</small>
		  									</h3>
										</div>
									  </div>
									</div>
			  					<div className="hr-divider">
												<ul className="nav nav-pills hr-divider-content hr-divider-nav" role="tablist">
												  <li className="nav-item" role="presentation">
												     <a onClick={this.toggleGraph} className="nav-link" role="tab" data-toggle="tab" aria-controls="sales">Return</a>
												  </li>
												  <li className="nav-item" role="presentation">
												     <a onClick={this.toggleGraph} className="nav-link" role="tab" data-toggle="tab" aria-controls="inventory">Diversity</a>
												  </li>
												  <li className="nav-item" role="presentation">
												      <a className="nav-link" role="tab" data-toggle="tab" aria-controls="profit">Health</a>
												   </li>
													</ul>
											</div>
													{this.state.renderBar &&
													<div className="row"> 
													<div style={style}>
													<BarChart width={750} height={550} data={data} stackOffset="sign"
										            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
										       <XAxis dataKey="Coin"/>
										       <YAxis/>
										       <CartesianGrid strokeDasharray="3 3"/>
										       <Tooltip/>
										       <Legend/>
										       <ReferenceLine y={0} stroke='#000'/>
										       <Bar dataKey="Investment" fill="#1485CC" stackId="stack" />
										       <Bar dataKey="Return" fill="#FFC551" stackId="stack" />
										      </BarChart>
										     	</div>
										      </div>}
										      {this.state.renderDiv &&
										      <div className="row"> 
													<div style={style}>
														<PieChart width={800} height={400}>
											        <Pie dataKey="Investment" data={investmentData} cx={200} cy={200} outerRadius={80} fill="#8884d8" labelLine={false} label={renderCustomizedLabel}>
											        	{
											          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
											          }
											         </Pie>
											       </PieChart>
										     	</div>
										      </div>
										      }
								    </div>
								 </div>
			)
	}

}

export default Portfolio