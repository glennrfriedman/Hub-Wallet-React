import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Coincard from './Coincard';

class Hub extends Component { 

	render(){
		return (
			<div className="App">
        <Sidebar />
        <Coincard rowName='Current Holdings' coin='bitcoin' />
        <Coincard rowName='Return on Investment' coin='ethereum' />
        <Coincard rowName='Daily Growth' coin='eos'/>
      </div>
		)
	}

}

export default Hub; 