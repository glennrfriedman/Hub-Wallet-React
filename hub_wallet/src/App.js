import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './dist/toolkit-light.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
      <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark app-navbar">
    <a class="navbar-brand" href="../index.html">
      <span class="icon icon-wallet navbar-brand-icon"></span>
      Hub Wallet
    </a>

    <button
      class="navbar-toggler navbar-toggler-right d-md-none"
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="nav navbar-nav mr-auto">
        <li class="nav-item">
          <a class="nav-link" href="../order-history/index.html">Order History</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../fluid/index.html">Fluid layout</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../icon-nav/index.html">Icon nav</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="../docs/index.html">Docs</a>
        </li>
      </ul>
    </div>
  </nav>
  </div>
  
    );
  }
}

export default App;
