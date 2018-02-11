import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import commaNumber from 'comma-number';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, Tooltip } from 'reactstrap';
import Editcoin from './Editcoin';

class Coincard extends Component {

	constructor(props){
		super(props);
		this.state = { rowName: this.props.rowName, data: this.props.data, getData: this.props.getData, modal: false, isOpen: false, editModal: false, editModalisOpen: false, oneCoinTooltipOpen: false, editTooltipOpen: false, deleteTooltipOpen: false}
		this.clickCard = this.clickCard.bind(this);
		this.checkDeltaPort = this.checkDeltaPort.bind(this);
		this.checkDeltaPrice = this.checkDeltaPrice.bind(this);
		this.checkStatColor = this.checkStatColor.bind(this);
		this.onClickDelete = this.onClickDelete.bind(this);
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.editToggle = this.editToggle.bind(this);
		this.toggleEditModal = this.toggleEditModal.bind(this);
		this.toggleOneCoinTooltip = this.toggleOneCoinTooltip.bind(this);
		this.toggleEditTooltip = this.toggleEditTooltip.bind(this);
		this.toggleDeleteTooltip = this.toggleDeleteTooltip.bind(this);
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

	editToggle(){
		this.setState({
      editModalisOpen: !this.state.editModalisOpen
    });
	}

	toggleOneCoinTooltip() {
    this.setState({
      oneCoinTooltipOpen: !this.state.oneCoinTooltipOpen
    });
  }

  toggleEditTooltip() {
    this.setState({
      editTooltipOpen: !this.state.editTooltipOpen
    });
  }

  toggleDeleteTooltip() {
    this.setState({
      deleteTooltipOpen: !this.state.deleteTooltipOpen
    });
  }

	toggleModal(event){
		// console.log('event in toggleModal is', event.target.className);
		this.setState({
       modal: !this.state.modal
    });
	}

	toggleEditModal(event){
		this.setState({
       editModal: !this.state.editModal
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
						<h5 className="statcard-number mt-2">Price: 
	    				${commaNumber(this.props.data.price_usd)}
	    				<small className={this.state.deltaPrice}>{this.props.data.percent_change_24h}%</small>
	  				</h5><br></br>
	 	 				<h5 className="statcard-number">Holding:
	    				${commaNumber(this.props.data.net_present_value.toFixed(2))}
	    			<small className={this.state.deltaPort}>{roi}%</small>
	  				</h5>
	  		<div className="text-xs-right">
	  					<Tooltip placement="bottom" isOpen={this.state.oneCoinTooltipOpen} target="oneCoin" toggle={this.toggleOneCoinTooltip}>
          			View More 
        			</Tooltip>
        			<Tooltip placement="bottom" isOpen={this.state.editTooltipOpen} target="edit" toggle={this.toggleEditTooltip}>
          			Edit 
        			</Tooltip>
        			<Tooltip placement="bottom" isOpen={this.state.deleteTooltipOpen} target="delete" toggle={this.toggleDeleteTooltip}>
          			Delete
        			</Tooltip>
	  		 			<Link id="oneCoin" to={{ pathname: link, getData: this.state.getData, state: { data: this.props.data, allCoinData: this.props.allCoinData, deltaPort: this.state.deltaPort } }}><span style={{margin: 2 + "%", color: 'white'}} className="icon icon-line-graph"></span></Link>
							<span id="edit" onClick={this.toggleEditModal} style={{margin: 2 + "%"}} className="icon icon-info"></span>
							<span id="delete" onClick={this.toggleModal} style={{margin: 2 + "%"}} className="icon icon-trash"></span>
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
     		<Modal className="modal-sm" isOpen={this.state.editModal} toggle={this.editToggle}>
          <ModalHeader toggle={this.toggleEditModal}>Edit {this.props.data.coin_name} Holdings</ModalHeader>
          <ModalBody style={{display: "flex", justifyContent: "center"}}>
            	<Editcoin user={this.props.user} data={this.props.data} getData={this.props.getData} url={this.props.url} handleModal={this.toggleEditModal} />
          </ModalBody>
     		</Modal>
			</div>
		)
	}

}

export default Coincard;