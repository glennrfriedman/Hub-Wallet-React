import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import commaNumber from 'comma-number';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

class Coincard extends Component {

	constructor(props){
		super(props);
		this.state = { rowName: this.props.rowName, data: this.props.data, getData: this.props.getData, modal: false, isOpen: false }
		this.clickCard = this.clickCard.bind(this);
		this.checkDeltaPort = this.checkDeltaPort.bind(this);
		this.checkDeltaPrice = this.checkDeltaPrice.bind(this);
		this.checkStatColor = this.checkStatColor.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	componentDidMount(){
		// console.log('getData in coincard is', this.state.getData);
		this.checkDeltaPort();
		this.checkDeltaPrice();
		this.checkStatColor();
	}

	toggle(){
		this.setState({
      isOpen: !this.state.isOpen
    });
	}

	toggleModal(event){
		// console.log('event in toggleModal is', event.target.className);
		this.setState({
       modal: !this.state.modal
    });
	}

	onClickDelete(){
		console.log('delete clicked');
		 axios.delete(`${this.props.url}/api/coins/${this.props.data.id}`)
      .then(res => {
        this.props.getData(this.props.user.id);
      })
	}

	checkDeltaPort(){
		if (this.props.data.return_on_investment_percent > 0){
					this.setState({ deltaPort: "delta-indicator delta-positive", statcardPort: "statcard statcard-success p-4 mb-2" }) ;
				}
		else if (this.props.data.return_on_investment_percent < 0){
					this.setState({ deltaPort: "delta-indicator delta-negative", statcardPort: "statcard statcard-danger p-4 mb-2" }) ;
				}
	}

	checkDeltaPrice(){
		if (this.props.data.percent_change_24h > 0){
				this.setState({ deltaPrice: "delta-indicator delta-positive", statcardPort: "statcard statcard-success p-4 mb-2" }) ;
				}
		else if (this.props.data.percent_change_24h < 0){
					this.setState({ deltaPrice: "delta-indicator delta-negative", statcardPrice: "statcard statcard-danger p-4 mb-2" }) ;
				}
	}

	checkStatColor(){
		if ((this.props.data.return_on_investment_percent > 0) && (this.props.data.percent_change_24h > 0)){
			this.setState({ statColor: "statcard statcard-success p-4 mb-2" })
		}
		else if ((this.props.data.return_on_investment_percent > 0) || (this.props.data.percent_change_24h > 0)){
			this.setState({ statColor: "statcard statcard-warning p-4 mb-2" })
		}
		else if ((this.props.data.return_on_investment_percent < 0) && (this.props.data.percent_change_24h < 0)){
			this.setState({ statColor: "statcard statcard-danger p-4 mb-2" })
		}
	}

	clickCard(){
		// console.log('card is clicked');
	}

	// test for git
	render(){
		let roi = (commaNumber(this.props.data.return_on_investment_percent) * 100).toFixed(2);
		// console.log('data from props in coincard is', this.props.data);
		// if (this.state.dataReceived === true) {
		// 	console.log('data in redner is', this.state.data )
		// }
		let link = `/coin/${this.props.data.id}`
		return(
			<div className="col-sm-6">
				<div className={this.state.statColor} onClick={this.clickCard}>
				<span className="statcard-desc" style={{fontSize: 20 + "px", fontWeight: "heavy"}}>{this.props.data.coin_name}</span>
						<h4 className="statcard-number">Price: 
	    				${commaNumber(this.props.data.price_usd)}
	    				<small className={this.state.deltaPrice}>{this.props.data.percent_change_24h}%</small>
	  				</h4><br></br>
	 	 				<h4 className="statcard-number">Holding:
	    				${commaNumber(this.props.data.net_present_value.toFixed(2))}
	    			<small className={this.state.deltaPort}>{roi}%</small>
	  				</h4>
	  		<div className="text-xs-right">
	  		 			<Link to={{ pathname: link, getData: this.state.getData, state: { data: this.props.data, allCoinData: this.props.allCoinData, deltaPort: this.state.deltaPort } }}><span style={{margin: 2 + "%", color: 'white'}} className="icon icon-line-graph"></span></Link>
							<span style={{margin: 2 + "%"}} className="icon icon-info"></span>
							<span onClick={this.toggleModal} style={{margin: 2 + "%"}} className="icon icon-trash"></span>
				</div>
				</div>
				<Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggleModal}>Delete</ModalHeader>
          <ModalBody>
            	Are you sure you want to delete {this.props.data.coin_name} holdings from {this.props.data.date_of_transaction}?
          </ModalBody>
          <ModalFooter>
          	<Button onClick={this.onClickDelete} color="danger">Delete</Button>
          	<Button onClick={this.toggleModal} color="primary">Cancel</Button>
          </ModalFooter>
     		</Modal>
			</div>
		)
	}

}

export default Coincard;