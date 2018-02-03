import React, { Component } from 'react';
// import { Form, FormGroup, Col, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Addcoin extends Component {
  constructor(props) {
    super(props);
    this.state = { total_investment: 0, shares: 0, date_of_transaction: ''};
    this.saveCoin = this.saveCoin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  saveCoin(event) {
    event.preventDefault();
    console.log(this.props);
    axios.post(`${this.props.url}/api/save`, {
        user_id: this.props.user.id,
        coin_name: this.props.coin,
        coin_id: this.props.id,
        investment: this.state.total_investment,
        shares: this.state.shares,
        date_of_transaction: this.state.date_of_transaction,
        symbol: this.props.symbol
      }).then(res => {
        // console.log(res);
        this.props.closeModal();
        this.props.getData(this.props.user.id);
        <Redirect to="/hub" />
      })
  }

  render() {
      return (
        <div id="docsModal" className={this.props.modalClass} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: this.props.style}} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Add {this.props.coin} ({this.props.symbol}) to Portfolio:</h4>
                  <button onClick={this.props.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden={this.props.aria}>×</span></button>
                </div>
                <form className="modal-body" onSubmit={this.saveCoin}>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <div className="form-group container-fluid">
                    <label className="col-form-label">Investment:</label><br></br>
                        <div className="input-with-icon">
                            <input name="total_investment" type="investment" placeholder="Total Investment" className="form-control" value={this.state.total_investment} onChange={this.onChange}/>
                            <span className="icon icon-credit"></span>
                        </div>
                  </div>
                  <div className="form-group container-fluid">
                    <label className="col-form-label">Number of Shares:</label><br></br>
                    <div className="input-with-icon">
                            <input name="shares" type="shares" placeholder="Number of Shares" className="form-control" value={this.state.shares} onChange={this.onChange}/>
                            <span className="icon icon-line-graph"></span>
                    </div>
                </div>
                <div className="form-group container-fluid">
                    <label className="col-form-label">Date of Transaction:</label><br></br>
                    <div className="input-with-icon">
                            <input name='date_of_transaction' type="date_of_transaction" placeholder="Date (MM/DD/YYYY)" className="form-control" value={this.state.date_of_transaction} onChange={this.onChange}/>
                            <span className="icon icon-calendar"></span>
                    </div>
                </div>
                </div>
                    <div className="modal-footer">
                        <input className="btn btn-primary" type='submit' value='Save Coin' />
                    </div>
                  </form>
                </div>
              </div>
            </div>
    );
  }
}

export default Addcoin;