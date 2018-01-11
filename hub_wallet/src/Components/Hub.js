import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Coincard from './Coincard';

class Hub extends Component { 

	render(){
		return (
			<div className="cointaner">
        <Sidebar />
        <Coincard rowName='Daily Growth' coin='eos'/>
        <Coincard rowName='Daily Growth' coin='bitcoin'/>
        <Coincard rowName='Daily Growth' coin='ethereum'/>
      </div>
		)
	}
}

export default Hub; 