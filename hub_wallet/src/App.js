// importing dependencies
import React, { Component } from 'react';
// import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Security, ImplicitCallback } from '@okta/okta-react';
import './dist/toolkit-light.min.css';
// importing components
import Auth from './Components/Auth';

class App extends Component {
  render() {
    return (
    	<div className="cointaner">
      <BrowserRouter>
        <Route path="/" render={props => <Auth {...props} />} />
      </BrowserRouter>
      </div>
    );
  }
}

export default App;
