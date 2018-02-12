import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup } from 'reactstrap';
import axios from 'axios';

import Cookies from '../helpers/Cookies';
import Landing from './Landing';
import Hub from './Hub';
import Onecoin from './Onecoin';
import Portfolio from './Portfolio';
import Ticker from './Ticker';
import News from './News';
import Sidebar from './Sidebar';
require('dotenv').config()
let url = process.env.REACT_APP_URL;
// console.log('url is', url)

class UserAuth extends Component {
   
   constructor(){
    super();
    this.state = {
      user: false,
      url: url,
      mode: 'landing',
      userLoggedIn: false,
      isOpen: false, 
      modal: false,
      searched: false,
      searchResults: [],
      dataReceived: false,
      savedCoinData: []
    }
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.renderViews = this.renderViews.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.searchCoins = this.searchCoins.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.getUserCoinData = this.getUserCoinData.bind(this);
    this.checkSign = this.checkSign.bind(this);
  }

  componentDidMount() {
    this.initUser();
    // let sidebar = document.getElementById('sidebar');
  }

  getUserCoinData() {
      axios.get(`${this.state.url}/api/${this.state.user.id}/coins`)
        .then(data => {
          // console.log('data is', data.data);
          if (this.state.dataReceived === false){
            this.setState({ savedCoinData: data.data, dataReceived: true })
          }
          else if (this.state.dataReceived === true){
            this.setState({ savedCoinData: data.data })
          }
          this.checkSign();
          }
        )
    }

  checkSign(){
      if (this.state.dataReceived === true){
          if(this.state.savedCoinData.portfolio.total_roi_percent > 0){
              this.setState({deltaIndicator: 'delta-indicator delta-positive'});
              // return sign;
              }
          else if(this.state.savedCoinData.portfolio.total_roi_percent < 0){
              this.setState({deltaIndicator: 'delta-indicator delta-negative'});
            // return sign;
            }
      } 
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

  handleChange(event) {
    console.log('value in handleChange is ', event.target.value);
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
    axios.get(`${this.state.url}/api/search/${this.state.value}`)
    .then(res => {
      this.setState({searchResults: res.data.searchResults})
      // console.log('search results are ', res.data.searchResults);
      })
    }
  }

  clearSearch(){
    this.setState({
      searched: false,
      value: "",
      searchResults: []
    });
  }

  initUser(){
    const token = Cookies.get('token');

    if(token && token !== ''){
      axios.get(`${this.state.url}/users/validate`, {
        params: {auth_token: token}})
        .then(res => {
          this.setState({user: res.data, mode: 'hub', logout: 'no'});
        })
        .catch(err => {
          Cookies.set('token', '')
          this.setState({user: false, mode: 'auth'});
        })
    } else {
      this.setState({mode: 'auth'});
    }
  }

  setUser(user){
    Cookies.set('token', user.token);
    this.setState({ user: user }, () => {
      this.props.history.push(`/hub`);
    });
    // console.log(`this.state.user.email is ${this.state.user.email}`);
    // console.log(`this.state.user.id is ${this.state.user.id}`);
  }

  logout(){
    Cookies.set('token', '');
    this.setState({user: false});
  }

  toggleMode(e){ // toggle between the two modes
    e.preventDefault();
    this.setState(prev => { // the mode is what it is not
      prev.mode = prev.mode === "login" ? 'signup' : 'login';
      return prev
    })
  }

  requireUser(render) {
    return this.state.user ? render : <Redirect to="/" />;
  }

  renderViews(){
    return (
      <div className="row"> 
        <Sidebar user={this.state.user} url={this.state.url} data={this.state.savedCoinData} logout={this.props.logout} displaySearchResults={this.displaySearchResults} searchCoins={this.searchCoins} handleChange={this.handleChange} searchResults={this.state.searchResults} searched={this.state.searched} clearSearch={this.clearSearch} getUserCoinData={this.getUserCoinData} deltaIndicator={this.state.deltaIndicator}/>
      <Switch>
        <Route path="/hub" render={props => this.requireUser(<Hub user={this.state.user} url={this.state.url} logout={this.logout} getUserCoinData={this.getUserCoinData} savedCoinData={this.state.savedCoinData} dataReceived={this.state.dataReceived} checkSign={this.checkSign} deltaIndicator={this.state.deltaIndicator} routeProps={props}/>)}/>
        <Route path="/coin/:coin_id" render={props => this.requireUser(<Onecoin user={this.state.user} url={this.state.url} logout={this.logout} routeProps={props}/>)}/>
        <Route path="/portfolio" render={props => this.requireUser(<Portfolio user={this.state.user} url={this.state.url} logout={this.logout} routeProps={props}/>)}/>
        <Route path="/all_coins" render={props => this.requireUser(<Ticker user={this.state.user} url={this.state.url} logout={this.logout} routeProps={props}/>)}/>
        <Route path="/news" render={props => this.requireUser(<News user={this.state.user} url={this.state.url} logout={this.logout} routeProps={props}/>)}/>
      </Switch>
      </div>
      )
  }

  render(){
    // delta={this.state.deltaIndicator}
    // getData={this.getData}
    return (
      <div style={{margin: 1 + '%'}} className="cointaner">     
        <Route exact path="/" render={props => (<Landing user={this.state.user} setUser={this.setUser} logout={this.logout} url={this.state.url}/>)}/>
        {this.renderViews()}
      <div className="text-center p-3" style={{backgroundColor: "#f3f3f3"}}>
                <div className="col sm-6">
                  <small>Hub Wallet is for informational purposes and should not be considered investment advice.</small><br></br>
                  <small>All crypto currency data provided courtesy of the Coin Market Cap API.</small>
                </div>
                <div className="col sm-6">
                </div>
                <div className="col sm-6">
                <ButtonGroup className="mt-2 mb-3">
                    <Button size="sm" color="primary" onClick={this.toggleModal}>Donate</Button>
                    <Button size="sm" color="success" ><a style={{color: "white"}}href="mailto:glenn@hubwallet.io">Contact</a></Button>
                </ButtonGroup>
                </div>
                <div className="col sm-6">
                  Hub Wallet © 2018
                </div>
      </div>
      <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggleModal}>Donate</ModalHeader>
          <ModalBody className="text-center p-3">
              <div className="medium">BTC: 1EFBfxMbrXMYn8Had9i7xMFUWJJS7tDaay</div>
              <div className="medium">ETH: 0x36Cfc756AB4eC3805382Ace2Ce831409BC56b6FD</div>
              <div className="medium">LTC: Lbdj13fU1bRbCHPYqaLEhuJcbcfgd9pzEy</div>
              <div className="medium">BCH: 1ChXYbiE8aXDU3WrPkVGFgp5W4YRavrVAz</div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.toggleModal} color="primary">Thank you!</Button>
          </ModalFooter>
      </Modal>
      </div>
      )
  }
}
export default UserAuth;
