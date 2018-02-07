import React, { Component } from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css';
import commaNumber from 'comma-number';

// import DataTables from 'material-ui-datatables';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import BootstrapTable from 'react-bootstrap-table-next';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator';
// import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

class MarketTable extends Component {

	constructor(props){
		super(props);
		this.state = { data: this.props.tickerData }
		this.converMarketData = this.converMarketData.bind(this);
	}

	compnentDidMount(){
		// this.converMarketData();
	};

	converMarketData(){
			let tableData = [];
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
			tableData.push({
					rank: rank, 
					name: name,
					price_usd: price_usd,
					price_btc: price_btc, 
					market_cap_usd: market_cap_usd,
					percent_change_24h: percent_change_24h, 
					percent_change_1h: percent_change_1h,
					percent_change_7d: percent_change_7d
			})
			return tableData;
		})
		return tableData;
	}

	render(){
		let tableData = this.converMarketData();
		console.log('data in render is', this.state.tableData);
		// const { data } = this.state
		let { total_market_cap_usd, bitcoin_percentage_of_market_cap } = this.props.marketData
		let market_cap = "$" + commaNumber(total_market_cap_usd);
		let btc_ms = bitcoin_percentage_of_market_cap + "%"
		let crypto_count = this.state.data.length;
		// console.log( total_market_cap_usd, bitcoin_percentage_of_market_cap );
		const columns = [
											{
												Header: `Total Market Cap: ${market_cap} / BTC Market Share: ${btc_ms} / Crypto Count: ${crypto_count}`,
												columns: [
								  						{
								  							Header: 'Market Rank',
								  							accessor: 'rank'
								  						},
								  						{
								  							Header: 'Name',
								  							accessor: 'name',
								  							Filter: true
								  						},
								  						{
								  							Header: 'Price USD',
								  							accessor: 'price_usd',
								  							sortMethod: (a, b) => {
				                   					 if (a.length === b.length) {
				                      					return a > b ? 1 : -1;
				                    						}
				                    			return a.length > b.length ? 1 : -1;
				                  		}
								  						},
								  						{
								  							Header: 'Price BTC',
								  							accessor: 'price_btc'
								  						},
								  						{
								  							Header: 'Market Cap',
								  							accessor: 'market_cap_usd'
								  						},
								  						// {
								  						// 	Header: '24h Volume',
								  						// 	accessor: '24h_volume_usd',
								  						// },
								  						{
								  							Header: 'Percent Change 24h',
								  							accessor: 'percent_change_24h'
								  						},
								  						{
								  							Header: 'Percent Change 7d',
								  							accessor: 'percent_change_7d'
								  					 	}
								  					]
								  				}
            					]	
		return(
					 <ReactTable
					 			defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
					 			defaultSorted={[
					 				{
			              id: "rank",
			              desc: false
			            }
          			]}
					 			data={tableData}
					 			style={{ height: "600px" }}
					 			columns={columns}
					 			showPaginationBottom={true}
			          showPaginationTop={false}
								className=" -highlight"
								defaultPageSize={100}
								defaultSortDesc={true}
								// filterable={true}
      			/>
	  			)
	}
}

export default MarketTable;