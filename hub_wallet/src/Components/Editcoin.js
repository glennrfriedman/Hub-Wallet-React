import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { FormGroup, FormControl, InputGroup, Form, ModalFooter, Button, Label, Input, InputGroupAddon } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
// import cors from 'cors';
import axios from 'axios';

class Editcoin extends Component {
  constructor(props) {
    super(props);
    this.state = { total_investment: this.props.data.investment , shares: this.props.data.shares, date_of_transaction: this.props.data.date_of_transaction};
    this.editCoin = this.editCoin.bind(this);
    this.onChange = this.onChange.bind(this);
    this.afterEditCoin = this.afterEditCoin.bind(this);
  }

  componentDidMount(){
    console.log('url is edit coin is', this.props.data.id);
  }

  onChange(e) {
    let name = e.target.name
    let value = e.target.value
    this.setState({
      [e.target.name]: e.target.value
    }, console.log('state is now', name, value))
  }

  afterEditCoin(){
    // console.log('props are', this.props)
    this.props.handleModal();
    this.props.getData(this.props.user.id);
    <Redirect to="/hub" />
  }

  editCoin(event) {
    event.preventDefault();
    // console.log('inputs are ', this.state.total_investment, this.state.shares, this.state.date_of_transaction)
    // console.log(this.props.user);
    axios.post(`${this.props.url}/api/${this.props.data.id}/edit`, {
        investment: this.state.total_investment,
        shares: this.state.shares,
        date_of_transaction: this.state.date_of_transaction,
      }).then(res => {
        console.log(res);
        this.afterEditCoin();
      })
  }

  render() {
      return (
              <Form onSubmit={this.editCoin}>
                  <FormGroup>
                        <Label>Investment:</Label><br></br>
                        <div className="input-with-icon">
                            <input name="total_investment" type="investment" placeholder="Total Investment" className="form-control" value={this.state.total_investment} onChange={this.onChange}/>
                            <span className="icon icon-credit"></span>
                        </div>
                  </FormGroup>
                  <FormGroup>
                    <Label>Number of Shares:</Label><br></br>
                    <div className="input-with-icon">
                            <input name="shares" type="shares" placeholder="Shares" className="form-control" value={this.state.shares} onChange={this.onChange}/>
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
                      <input className="btn btn-primary" type='submit' value='Edit Holdings' />
                </ModalFooter>
                </Form>
            );
        }
    }

export default Editcoin;