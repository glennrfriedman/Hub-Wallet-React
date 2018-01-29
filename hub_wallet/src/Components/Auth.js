import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import axios from 'axios';

import Cookies from '../helpers/Cookies';
import Landing from './Landing';
import Hub from './Hub';
// import Addcoin from './Addcoin';

class UserAuth extends Component {
   constructor(){
    super();
    this.state = {
      user: false,
      url: 'http://localhost:8080'
    }
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.renderViews = this.renderViews.bind(this);
  }

  componentDidMount() {
    this.initUser();
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
    console.log(`this.state.user.email is ${this.state.user.email}`);
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
      <Switch>
        <Route exact path="/" render={props => (<Landing user={this.state.user} setUser={this.setUser} logout={this.logout} url={this.state.url}/>)}/>
        <Route path="/hub" render={props => this.requireUser(<Hub user={this.state.user} url={this.state.url} logout={this.logout} />)}/>
        {/*<Route path="/coin/:coin_id" render={props => this.requireUser(<Addcoin user={this.state.user} url={this.state.url} logout={this.logout} routeProps={props}/>)}/>*/}
      </Switch>
      )
  }

  render(){
    return (
      <div>{this.renderViews()}</div>
      )
  }
}
export default UserAuth;
