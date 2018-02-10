import React, { Component } from 'react';
import axios from 'axios';
import {Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
// import commaNumber from 'comma-number';
import { Link } from 'react-router-dom';
import Addcoin from './Addcoin';

class Sidebar extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      value: "",
      mode: 'hub',
      searchResults: [],
      searched: false,
      show: false,
      // showModal: 'hidden',
      // modalClass: 'modal fade',
      toggleNav: "nav-toggleable-md collapse", 
      ariaNav: 'false',
      navButtonClass: "nav-toggler nav-toggler-md sidebar-toggler collapsed",
      modal: false, 
      isOpen: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchCoins = this.searchCoins.bind(this);
    this.clickedCoin = this.clickedCoin.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleIsOpen = this.toggleIsOpen.bind(this);
  }

  toggleIsOpen(){
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  clickedCoin(event){
    this.handleModal();
    this.setState({
      coin: event.target.name, 
      coinId: event.target.id, 
      symbol: event.target.value,
      searched: false,
      value: "",
      searchResults: []
    });
     // }, () => console.log(this.state) )
  }

  toggleNav(){
    if (this.state.toggleNav === "nav-toggleable-md collapse"){
      this.setState({toggleNav: "nav-toggleable-md", ariaNav: 'true', navButtonClass: "nav-toggler nav-toggler-md sidebar-toggler"})
    }
    else if (this.state.toggleNav === "nav-toggleable-md"){
      this.setState({toggleNav: "nav-toggleable-md collapse", ariaNav: 'false', navButtonClass: "nav-toggler nav-toggler-md sidebar-toggler collapsed"})
    }
  }

  handleModal(){
    // console.log('modal closed');
    this.setState({ modal: !this.state.modal })
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value, searched: true
    }, this.searchCoins)
  }

  searchCoins() {
    if (this.state.value === "") {
      this.setState({searched: false})
      return
    }
    else {
    axios.get(`${this.props.url}/api/search/${this.state.value}`)
    .then(res => {
      this.setState({searchResults: res.data.searchResults})
      // console.log('search results are ', res.data.searchResults);
      })
    }
  }

  displaySearchResults() {
    let results = this.state.searchResults
    let renderSearch = []
    if (this.state.searchResults.length === 0) {
      return
    }
    else {
        results.map(e => {
        // let price = commaNumber(e.price_usd);
        if (renderSearch.length < 5) {
          renderSearch.push(<Button onClick={this.clickedCoin} name={e.name} id={e.id} value={e.symbol} className="list-group-item" style={{textAlign: "center"}} key={e.id}>{e.name} ({e.symbol})</Button>)
          return renderSearch
        }
        else {
          return renderSearch
        }
    })
    return renderSearch
    }
  }

  render(){
    return (
      <div className="col-md-3 sidebar">
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <button onClick={this.toggleNav} className={this.state.navButtonClass} type="button" data-toggle="collapse" data-target="#nav" aria-expanded={this.state.ariaNav}>
              <span className="sr-only">Toggle nav</span>
            </button>
            <div style={{fontSize: 40 + "px"}}className="sidebar-brand img-responsive">
              <span className="icon icon-wallet">
                <Link style={{color: "black"}} to="/hub">Hub</Link>
              </span>
            </div>
          </div>
          <div className={this.state.toggleNav} id="nav">
            <form className="sidebar-form">
              <input className="form-control" type="text" ref={el=>{this.search=el}} placeholder="Search Coins..." onChange={this.handleChange} />
              <button onClick={this.handleChange} className="btn-link">
                <span className="icon icon-magnifying-glass"></span>
              </button>
              <ul className="list-group">{this.state.searched && this.displaySearchResults()}</ul>
            </form>
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">{this.props.user.first_name} {this.props.user.last_name}'s Hub</li>
              <li className="nav-item">
                {this.state.mode === 'hub' ? (
                  <Link className="nav-link" to="/hub">Overview</Link>
                  ): (
                  <Link className="nav-link" to="/hub">Overview</Link>
                  )}
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={{ pathname: "/portfolio", state: { data: this.props.data, user: this.props.user, delta: this.props.delta } }}>Portfolio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={{ pathname: "/all_coins", getData: this.state.getData, state: { data: this.props.data, user: this.props.user, allCoinData: this.props.allCoinData } }}>Market Data</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={{ pathname: "/news", getData: this.state.getData, state: { data: this.props.data, user: this.props.user, allCoinData: this.props.allCoinData } }}>News</Link>
              </li>
            </ul>
            <hr className="visible-xs mt-3"></hr>
            <ul className="nav nav-pills nav-stacked flex-column">
               <li className="nav-item">
                <a onClick={this.props.logout} className="nav-link">Logout</a>
              </li>
            </ul>
          </div>
        </nav>
        {/*<Addcoin getData={this.props.getData} url={this.props.url} user={this.props.user} coinData={this.getCoinInfo} modalClass={this.state.modalClass} aria={this.state.aria} style={this.state.style} closeModal={this.closeModal} coin={this.state.coin} id={this.state.coinId} symbol={this.state.symbol} />*/}
        <Modal className="modal-sm" isOpen={this.state.modal} toggle={this.toggleIsOpen}>
          <ModalHeader toggle={this.handleModal}>Add {this.state.coin} ({this.state.symbol}) to Portfolio:</ModalHeader>
          <ModalBody style={{display: "flex", justifyContent: "center"}}>
              <Addcoin getData={this.props.getData} url={this.props.url} user={this.props.user} handleModal={this.handleModal} coin={this.state.coin} id={this.state.coinId} symbol={this.state.symbol} click={this.clickedCoin} />
          </ModalBody>
        </Modal>
      </div>
    )
  }

}

export default Sidebar;