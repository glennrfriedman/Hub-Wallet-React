// importing dependencies
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './docs/assets/css/toolkit-light.css';
import './docs/assets/css/docs.css';
import './docs/assets/css/application.css';

// importing components
import Hub from './Components/Hub';

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
      <BrowserRouter>
        <Route path="/" render={props => <Hub {...props}/>} />
      </BrowserRouter>    
    );
  }
}

export default App;
