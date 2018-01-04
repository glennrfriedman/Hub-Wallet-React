import React, { Component } from 'react';

import Sidebar from './Sidebar';
import Coincard from './Coincard';

class Hub extends Component { 

	render(){
		return (
			<div className="cointaner">
        <Sidebar />
        <Coincard rowName='Daily Growth' coin='eos'/>
      </div>
		)
	}
}

export default Hub; 