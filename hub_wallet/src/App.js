import React, { Component } from 'react';

import Sidebar from './Components/Sidebar';
import Coincard from './Components/Coincard';

import './App.css';
import './dist/toolkit-light.min.css';

class App extends Component {

  constructor(props){
    super(props)
  }


  render() {
    return (
      <div className="App">
        <Sidebar />
        <Coincard rowName='Current Holdings' />
        <Coincard rowName='Return on Investment' />
        <Coincard rowName='Daily Growth'/>
      </div>
    
    );
  }
}

export default App;
