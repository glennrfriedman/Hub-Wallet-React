import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, Form, ModalFooter, Label } from 'react-bootstrap';
// import FontAwesome from 'react-fontawesome';
// import cors from 'cors';
import axios from 'axios';

class Addcoin extends Component {
  constructor(props) {
    super(props);
    this.state = { total_investment: 0, shares: 0, date_of_transaction: ''};
    this.saveCoin = this.saveCoin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.afterSaveCoin = this.afterSaveCoin.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  afterSaveCoin(){
    this.props.handleModal();
    this.props.getUserCoinData();
    <Redirect to="/hub"/>
  }

  saveCoin(event) {
    console.log('inputs are ', this.state.total_investment, this.state.shares, this.state.date_of_transaction)
    event.preventDefault();
    console.log(this.props.user);
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
        this.afterSaveCoin();
      })
  }

  render() {
      return (
              <Form onSubmit={this.saveCoin}>
                  <FormGroup>
                        <Label>Investment:</Label><br></br>
                        <div className="input-with-icon">
                            <input name="total_investment" type="investment" placeholder="Total Investment" className="form-control"value={this.state.total_investment} onChange={this.onChange}/>
                            <span className="icon icon-credit"></span>
                        </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Number of Shares:</Label><br></br>
                    <div className="input-with-icon">
                            <input name="shares" type="shares" placeholder="Number of Shares" className="form-control" value={this.state.shares} onChange={this.onChange}/>
                            <span className="icon icon-line-graph"></span>
                    </div>
                </FormGroup>
                <FormGroup>
                    <Label>Date of Transaction:</Label><br></br>
                    <div className="input-with-icon">
                            <input name='date_of_transaction' type="date_of_transaction" placeholder="Date (MM/DD/YYYY)" className="form-control" value={this.state.date_of_transaction} onChange={this.onChange}/>
                            <span className="icon icon-calendar"></span>
                    </div>
                </FormGroup>
                <ModalFooter>
                      <input className="btn btn-primary" type='submit' value='Save Coin' />
                </ModalFooter>
                </Form>
            );
        }
    }

export default Addcoin;