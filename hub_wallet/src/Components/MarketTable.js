import React, { Component } from 'react';
import { Table, Input, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import commaNumber from 'comma-number';
import query from 'array-query';
// import $ from 'jquery'

class MarketTable extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.tickerData }
		this.renderMarketData = this.renderMarketData.bind(this);
		this.assignRowStyle = this.assignRowStyle.bind(this);
		// this.onChange = this.onChange.bind(this);
		this.filterTable = this.filterTable.bind(this);
	}

	componentDidMount(){
		// this.filterTable();
		console.log('tickerData in Market Table is', this.state.data)
	}

	assignRowStyle(number){
		let gain = {color: "#11E20C"}
		let loss = {color: "#FF0215"}
		if (number > 0){
			return gain;
		}
		else if (number < 0){
			return loss;
		}
	}

	filterTable(e) {
		if (e.target.value === ""){
			this.setState({data: this.props.tickerData})
		}
		else {
				let searchTerm = e.target.value.toLowerCase();
				let searchList = query('id').search(searchTerm).on(this.state.data);
				this.setState({data: searchList});
			}
  }

	renderMarketData(){
		let tableRows = [];
			this.state.data.forEach(coin => {
			let name = coin.name
			let rank = coin.rank * 1
			let price_usd = "$" + commaNumber(coin.price_usd)
			let price_btc = coin.price_btc * 1
			let market_cap_usd = "$" + commaNumber(coin.market_cap_usd)
			// let available_supply = coin.available_supply * 1
			// let percent_change_1h = commaNumber(coin.percent_change_1h) + "%"
			let percent_change_24h = commaNumber(coin.percent_change_24h) + "%"
			let percent_change_7d = commaNumber(coin.percent_change_7d) + "%"
			let coinDayChange = coin.percent_change_24h * 1
			let coinWeekChange = coin.percent_change_7d * 1
			// console.log('coin.percent_change_24h is ',(coin.percent_change_24h * 1)) 
			// if (tableRows.length < 10){
				tableRows.push(
					<tr key={coin.id} id="table tr">
					<td>{rank}</td>
					<td>{name}</td>
					<td>{price_usd}</td>
					<td>{price_btc}</td>
					<td>{market_cap_usd}</td>
					<td style={this.assignRowStyle(coinDayChange)}>{percent_change_24h}</td>
					<td style={this.assignRowStyle(coinWeekChange)}>{percent_change_7d}</td>
					</tr>
				)
			// }
			return tableRows;
		})
		return tableRows;
	}

	render(){
		let { total_market_cap_usd, bitcoin_percentage_of_market_cap } = this.props.marketData
 		let market_cap = "$" + commaNumber(total_market_cap_usd);
 		let btc_ms = bitcoin_percentage_of_market_cap + "%"
 		let crypto_count = this.state.data.length;
		return(
			<div>
			<div className="text-center p-3">
			<Breadcrumb>
       Total Market Cap: <span style={{color: 'blue'}}>{market_cap}</span> / BTC Market Share: <span style={{color: 'blue'}}>{btc_ms}</span> / Crypto Count: <span style={{color: 'blue'}}>{crypto_count}</span>
      </Breadcrumb>
      </div>
			<Input placeholder="Filter Coins..." id="myInput" onChange={this.filterTable}></Input>
			<Table responsive hover id="myTable">
						<thead>
							<tr>
								<th>Market Rank</th>
								<th>Name</th>
								<th>Price USD</th>
								<th>Price BTC</th>
								<th>Market Cap</th>
								<th>Percent Change 24h</th>
								<th>Percent Change 7d</th>
							</tr>
						</thead>
						<tbody>
							{this.renderMarketData()}
						</tbody>
			</Table>
			</div>
	  			)
	}
}

export default MarketTable;