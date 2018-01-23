// importing dependencies
import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { Security, ImplicitCallback } from '@okta/okta-react';
import './toolkit-light.min.css';
// importing components
import Auth from './Components/Auth';
import Cookies from './helpers/Cookies';
import Hub from './Components/Hub';

class App extends Component {
  constructor(){
    super();
    this.state = {
      user: false,
      mode: 'loading',
      url: 'http://localhost:8080',
      logout: 'yes'
    }
    this.setUser = this.setUser.bind(this);
    this.logout = this.logout.bind(this);
    this.renderView = this.renderView.bind(this);
  }

  componentDidMount(){
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
    this.setState({user: user, mode: 'content', logout: 'no'});
  }

  logout(){
    Cookies.set('token', '');
    this.setState({user: false, mode: 'auth', logout: 'yes'});
  }

  renderView(){
    if (( this.state.mode === 'loading') && (this.state.logout === 'yes')) {
      return(
        <div className="loading">
          <img src="https://s-media-cache-ak0.pinimg.com/originals/8b/a8/ce/8ba8ce24910d7b2f4c147359a82d50ef.gif"
            alt="loading" />
        </div>
      )
    } else if ((this.state.mode === 'auth') && (this.state.logout === 'yes')) {
      return (
        <Auth
          setUser={this.setUser.bind(this)}
          url={this.state.url}
        />
      )
    } else if ((this.state.mode === 'hub') && (this.state.logout === 'no')) {
      return (
        <Hub
          user={this.state.user} />
      )
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Route path="/" render={props => <Auth {...props} />} />
      </BrowserRouter>
    );
  }
}

export default App;
