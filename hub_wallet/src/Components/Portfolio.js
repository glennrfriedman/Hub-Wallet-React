import React, { Component } from 'react';
import { Pie, Bar, Doughnut } from 'react-chartjs-2';
import commaNumber from 'comma-number';
import Sidebar from './Sidebar';

class Portfolio extends Component {

	constructor(props){
		super(props);
		this.state = { 
									 data: this.props.routeProps.location.state.data, 
									 chartData: [], 
									 user:  this.props.routeProps.location.state.user, 
									 delta: this.props.routeProps.location.state.delta, 
									 mode: 'return' 
									}
		this.createPieData = this.createPieData.bind(this);
		this.createBarData = this.createBarData.bind(this);
		this.createDoughnutData = this.createDoughnutData.bind(this);
		this.toggleGraph = this.toggleGraph.bind(this);
	}

	componentDidMount(){
		this.createPieData();
		this.createBarData();
		this.createDoughnutData();
	}

	createDoughnutData(){
		let { total_investment, total_roi_dollars } = this.state.data.portfolio
		let doughnutData = {
					labels: ['Investment', 'Return'], 
					datasets: [ { 
						label: 'Coin', 
						data: [total_investment, total_roi_dollars],
						backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',]  
					} ] };
		this.setState({doughnutData: doughnutData})
	}

	createBarData(){
		let barChartData = {
					labels: [], 
					datasets: [ { 
						label: 'Investment', 
						backgroundColor: "#5C99B3",
						data: []
						// backgroundColor:[
      //         'rgba(255, 99, 132, 0.6)',
      //         'rgba(54, 162, 235, 0.6)',
      //         'rgba(255, 206, 86, 0.6)',
      //         'rgba(75, 192, 192, 0.6)',
      //         'rgba(153, 102, 255, 0.6)',
      //         'rgba(255, 159, 64, 0.6)',
      //         'rgba(255, 99, 132, 0.6)']  
					},
					{
						label: 'Current Holdings', 
						data: [],
						backgroundColor: 'rgba(255, 159, 64, 0.6)'
					},
					{ 
						label: 'Return', 
						data: [],
						backgroundColor: "#71B37C"
					} ] };
		this.state.data.savedCoinData.forEach(function(coin){
				let investment = coin.investment.toFixed(2)
				let net_present_value = coin.net_present_value.toFixed(2)
				let return_on_investment_dollars = coin.return_on_investment_dollars.toFixed(2)
				barChartData.labels.push(coin.coin_name);
				barChartData.datasets[0].data.push(investment);
				barChartData.datasets[2].data.push(return_on_investment_dollars);
				barChartData.datasets[1].data.push(net_present_value);
			return barChartData;
		})
		this.setState({barChartData: barChartData});
	}

	createPieData(){
		let { total_investment } = this.state.data.portfolio
		let pieChartData = {
					labels: [], 
					datasets: [ { 
						label: 'Coin', 
						data: [],
						backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)']  
					} ] };
		this.state.data.savedCoinData.forEach(function(coin){
				let percentTotalPortfolio = ((coin.investment/total_investment)*100).toFixed(2)
				// let net_present_value = coin.net_present_value.toFixed(2)
				// let return_on_investment_dollars = coin.return_on_investment_dollars.toFixed(2)
				pieChartData.labels.push(coin.coin_name);
				pieChartData.datasets[0].data.push(percentTotalPortfolio);
			return pieChartData;
		})
		this.setState({pieChartData: pieChartData});
	}

	toggleGraph(event){
		// console.log('event.target is', event.target);
		this.setState({mode: event.target.name})
	}

	render(){
		// console.log(this.state.user)
		// console.log('chartData in render is ', this.state.chartData)
		// console.log('data in portfolio is', this.state.data);
		// let style = {
		// 	  boxSizing: "border-box",
  // 			padding: 10 + "px",
  // 			width: 800 + "px",
  // 			height: 800 + "px",
  // 			backgroundColor: "#fff"
		// }
		// const investmentData = this.createPieObj();
		// console.log('investmentData is', investmentData);
		// const returnData = this.createPieObj2();
		// console.log('returnData is', returnData);
		// let data = this.createChartObj();
		return(
				<div style={{margin: 1 + '%'}} className="row">
					<Sidebar logout={this.props.logout} user={this.props.user} url={this.props.url} />
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
												  		{this.state.mode === 'return' && 
												     	<a onClick={this.toggleGraph} className="nav-link active" name='return' role="tab" data-toggle="tab">Return</a>}
												     	{this.state.mode === 'diversity' && 
												     	<a onClick={this.toggleGraph} className="nav-link" name='return' role="tab" data-toggle="tab">Return</a>}
												     	{this.state.mode === 'health' && 
												     	<a onClick={this.toggleGraph} className="nav-link" name='return' role="tab" data-toggle="tab">Return</a>}
												  </li>
												  <li className="nav-item" role="presentation">
												  	{this.state.mode === 'return' && 
												     <a onClick={this.toggleGraph} className="nav-link" name='diversity' role="tab" data-toggle="tab">Diversity</a>}
												     {this.state.mode === 'diversity' && 
												     <a onClick={this.toggleGraph} className="nav-link active" name='diversity' role="tab" data-toggle="tab">Diversity</a>}
												     {this.state.mode === 'health' && 
												     <a onClick={this.toggleGraph} className="nav-link" name='diversity' role="tab" data-toggle="tab">Diversity</a>}
												  </li>
												  <li className="nav-item" role="presentation">
												  	{this.state.mode === 'return' && 
												     <a onClick={this.toggleGraph} className="nav-link"  name='health' role="tab" data-toggle="tab" aria-controls="profit">Health</a>}
												     {this.state.mode === 'diversity' && 
												     <a onClick={this.toggleGraph} className="nav-link"  name='health' role="tab" data-toggle="tab" aria-controls="profit">Health</a>}
												     {this.state.mode === 'health' && 
												     <a onClick={this.toggleGraph} className="nav-link active"  name='health' role="tab" data-toggle="tab" aria-controls="profit">Health</a>}
												   </li>
													</ul>
											</div>
													{this.state.mode === 'return' &&
													<div className="row"> 
													{/*<div style={style}>
													<BarChart label width={750} height={550} data={data} stackOffset="sign"
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
										     	</div>*/}
										     	<Bar
											          data={this.state.barChartData}
											          options={{
											            title:{
											              display:true,
											              text:'Return and Investment Dollars by Coin',
											              fontSize:25
											            },
											            legend:{
											              display:true,
											              position:"bottom"
											            },
											            responsive: true
											          }}
											        />
										      </div>}
										      {this.state.mode === 'diversity' &&
										      <div className="row"> 
										      <Pie
											          data={this.state.pieChartData}
											          options={{
											            title:{
											              display:true,
											              text:'Portfolio Diversity by Invested Dollars',
											              fontSize:25
											            },
											            legend:{
											              display:true,
											              position:"bottom"
											            },
											            responsive: true
											          }}
											        />
										     	</div>
										      }
										      {this.state.mode === 'health' &&
										      <div className="row"> 
										      <Doughnut
											          data={this.state.doughnutData}
											          options={{
											            title:{
											              display:true,
											              text:'Portfolio Diversity by Invested Dollars',
											              fontSize:25
											            },
											            legend:{
											              display:true,
											              position:"bottom"
											            },
											            responsive: true
											          }}
											        />
										     	</div>
										      }
								    </div>
								 </div>
			)
	}

}

export default Portfolio