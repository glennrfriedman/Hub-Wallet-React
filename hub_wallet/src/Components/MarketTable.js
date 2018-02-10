import React, { Component } from 'react';
// import ReactTable from "react-table";
import { Table } from 'reactstrap';
// import 'react-table/react-table.css';
import commaNumber from 'comma-number';
// import tablesort from 'tablesort';
import $ from 'jquery';
import '../Datatables.css';
$.DataTable = require('datatables.net');

// import DataTables from 'material-ui-datatables';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

const columns = [
								  						{
								  							title: 'Market Rank',
								  							data: 'rank'
								  						},
								  						{
								  							title: 'Name',
								  							data: 'name'
								  						},
								  						{
								  							title: 'Price USD',
								  							data: 'price_usd'
								  						},
								  						{
								  							title: 'Price BTC',
								  							data: 'price_btc'
								  						},
								  						{
								  							title: 'Market Cap',
								  							data: 'market_cap_usd'
								  						},
								  						// {
								  						// 	title: '24h Volume',
								  						// 	data: '24h_volume_usd',
								  						// },
								  						{
								  							title: 'Percent Change 24h',
								  							data: 'percent_change_24h'
								  						},
								  						{
								  							title: 'Percent Change 7d',
								  							data: 'percent_change_7d'
								  					 	}
								  					]

class MarketTable extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.tickerData }
		// this.converMarketData = this.converMarketData.bind(this);
		this.renderMarketData = this.renderMarketData.bind(this);
		this.assignRowStyle = this.assignRowStyle.bind(this);
	}

	componentDidMount() {
		console.log('tickerData in CDM is ', this.props.tickerData)
         $('#myTable').DataTable({
           dom: '<"data-table-wrapper"t>',
           data: this.props.tickerData,
           paging: true,
           columns,
           ordering: false
        });
  }  

	componentWillUnmount(){
    $('.data-table-wrapper')
       .find('table')
       .DataTable()
       .destroy(true);
    }
  
  shouldComponentUpdate() {
        return true;
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

	renderMarketData(){
		let tableRows = [];
		this.state.data.forEach(coin => {
			let name = coin.name
			let rank = coin.rank * 1
			let price_usd = "$" + commaNumber(coin.price_usd)
			let price_btc = coin.price_btc * 1
			let market_cap_usd = "$" + commaNumber(coin.market_cap_usd)
			// let available_supply = coin.available_supply * 1
			let percent_change_1h = commaNumber(coin.percent_change_1h) + "%"
			let percent_change_24h = commaNumber(coin.percent_change_24h) + "%"
			let percent_change_7d = commaNumber(coin.percent_change_7d) + "%"
			let coinDayChange = coin.percent_change_24h * 1
			let coinWeekChange = coin.percent_change_7d * 1
			// console.log('coin.percent_change_24h is ',(coin.percent_change_24h * 1)) 
			if (tableRows.length < 10){
				tableRows.push(
					<tr key={coin.id}>
					<td>{rank}</td>
					<td>{name}</td>
					<td>{price_usd}</td>
					<td>{price_btc}</td>
					<td>{market_cap_usd}</td>
					<td style={this.assignRowStyle(coinDayChange)}>{percent_change_24h}</td>
					<td style={this.assignRowStyle(coinWeekChange)}>{percent_change_7d}</td>
					</tr>
				)
			}
			return tableRows;
		})
		return tableRows;
	}

	// converMarketData(){
	// 		let tableData = [];
	// 		this.state.data.forEach(coin => {
	// 		let name = coin.name
	// 		let rank = coin.rank * 1
	// 		let price_usd = "$" + commaNumber(coin.price_usd)
	// 		let price_btc = coin.price_btc * 1
	// 		let market_cap_usd = "$" + commaNumber(coin.market_cap_usd)
	// 		// let available_supply = coin.available_supply * 1
	// 		let percent_change_1h = commaNumber(coin.percent_change_1h) + "%"
	// 		let percent_change_24h = commaNumber(coin.percent_change_24h) + "%"
	// 		let percent_change_7d = commaNumber(coin.percent_change_7d) + "%"
	// 		tableData.push({
	// 				rank: rank, 
	// 				name: name,
	// 				price_usd: price_usd,
	// 				price_btc: price_btc, 
	// 				market_cap_usd: market_cap_usd,
	// 				percent_change_24h: percent_change_24h, 
	// 				percent_change_1h: percent_change_1h,
	// 				percent_change_7d: percent_change_7d
	// 		})
	// 		this.setState({tableData: tableData});
	// 	})
	// 	// this.setState({tableData: tableData});
	// }

	render(){
		// let tableData = this.converMarketData();
		// console.log('data in render is', this.state.tableData);
		// // const { data } = this.state
		// let { total_market_cap_usd, bitcoin_percentage_of_market_cap } = this.props.marketData
		// let market_cap = "$" + commaNumber(total_market_cap_usd);
		// let btc_ms = bitcoin_percentage_of_market_cap + "%"
		// let crypto_count = this.state.data.length;
		// // console.log( total_market_cap_usd, bitcoin_percentage_of_market_cap );
		// const columns = [
		// 									{
		// 										Header: `Total Market Cap: ${market_cap} / BTC Market Share: ${btc_ms} / Crypto Count: ${crypto_count}`,
		// 										columns: [
		// 						  						{
		// 						  							Header: 'Market Rank',
		// 						  							accessor: 'rank'
		// 						  						},
		// 						  						{
		// 						  							Header: 'Name',
		// 						  							accessor: 'name',
		// 						  							Filter: true
		// 						  						},
		// 						  						{
		// 						  							Header: 'Price USD',
		// 						  							accessor: 'price_usd',
		// 						  							sortMethod: (a, b) => {
		// 		                   					 if (a.length === b.length) {
		// 		                      					return a > b ? 1 : -1;
		// 		                    						}
		// 		                    			return a.length > b.length ? 1 : -1;
		// 		                  		}
		// 						  						},
		// 						  						{
		// 						  							Header: 'Price BTC',
		// 						  							accessor: 'price_btc'
		// 						  						},
		// 						  						{
		// 						  							Header: 'Market Cap',
		// 						  							accessor: 'market_cap_usd'
		// 						  						},
		// 						  						// {
		// 						  						// 	Header: '24h Volume',
		// 						  						// 	accessor: '24h_volume_usd',
		// 						  						// },
		// 						  						{
		// 						  							Header: 'Percent Change 24h',
		// 						  							accessor: 'percent_change_24h'
		// 						  						},
		// 						  						{
		// 						  							Header: 'Percent Change 7d',
		// 						  							accessor: 'percent_change_7d'
		// 						  					 	}
		// 						  					]
		// 						  				}
  //           					]	
		return(
			<div>
			<Table responsive hover>
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
			<div>
				<table id="myTable" ref='main'/>
			</div>
			</div>
	  			)
	}
}

export default MarketTable;