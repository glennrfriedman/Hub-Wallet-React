import React, { Component } from 'react';
import axios from 'axios';
import { Modal, OverlayTrigger, Button, Popover, Tooltip, ButtonToolbar } from 'react-bootstrap';
import commaNumber from 'comma-number';
// import Addcoin from './Addcoin';

class Sidebar extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      value: "",
      searchResults: [],
      searched: false,
      show: false,
      showModal: 'hidden',
      modalClass: 'modal fade'
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchCoins = this.searchCoins.bind(this);
    this.clickedCoin = this.clickedCoin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  clickedCoin(){
    console.log('searched coin clicked');
    this.setState({style: "block", aria: "false", modalClass: 'modal fade show'})
  }

  closeModal(){
    console.log('modal closed');
    this.setState({style: "none", aria: "true", modalClass: 'modal fade'})
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
      console.log('search results are ', res.data.searchResults);
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
        let price = commaNumber(e.price_usd);
        if (renderSearch.length < 5) {
          renderSearch.push(<Button onClick={this.clickedCoin} className="list-group-item" style={{textAlign: "center"}} key={e.id}>{e.name} ({e.symbol})</Button>)
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
            <a style={logoStlye} className="sidebar-brand img-responsive">
              <span className="icon icon-wallet sidebar-brand-icon"><span>Hub</span></span>
            </a>
          </div>
          <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
            <form className="sidebar-form">
              <input className="form-control" type="text" ref={el=>{this.search=el}} placeholder="Search Coins..." onChange={this.handleChange} />
              <button type="submit" className="btn-link">
                <span className="icon icon-magnifying-glass"></span>
              </button>
              <ul className="list-group">{this.state.searched && this.displaySearchResults()}</ul>
            </form>
          <div id="docsModal" className={this.state.modalClass} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: this.state.style}} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Example modal</h4>
                  <button onClick={this.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden={this.state.aria}>×</span></button>
                </div>
                <div className="modal-body">
                  <p>You're looking at an example modal in the dashboard theme.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Cool, got it!</button>
                </div>
              </div>
            </div>
          </div>
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">{this.props.user.first_name} {this.props.user.last_name}'s Portfolio</li>
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