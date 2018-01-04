import React, { Component } from 'react';

import Sidebar from './Components/Sidebar';
import Coincard from './Components/Coincard';

import './App.css';
import './dist/toolkit-light.min.css';

class App extends Component {
  
  // constructor(props){
  //   super(props)
  // }

  // In order to render statcard for each coin saved - 
  // create function that accomplishes the following 
  // pull list of saved-coins from database in back-end
  // end function with return of ( <Coincard coin=`${coinName}` ) after .map or .filter 
  // then call can be made for each component for each saved coin loaded 
  // this will allow for 1 "Coincard" component but will load all necessary Coincards 
  // drawback - not sure how fast/slow this will be with asynchroty of axios calls 

  render() {
    return (
      <div className="App">
        <Sidebar />
        <Coincard rowName='Current Holdings' coin='bitcoin' />
        <Coincard rowName='Return on Investment' coin='ethereum' />
        <Coincard rowName='Daily Growth' coin='eos'/>
      </div>
    
    );
  }
}

export default App;
