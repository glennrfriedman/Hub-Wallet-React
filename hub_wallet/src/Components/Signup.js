import React, { Component } from "react";
import { Form, Button, Col, ControlLabel, FormGroup, Checkbox, FormControl, InputGroup, ButtonGroup } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
// import './toolkit-light.min.css';

class Signup extends Component {
  constructor(){
    super();
    this.state = {
      inputs: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  }

  signUp(e){
    e.preventDefault();
    axios.post(`${this.props.url}/users`, this.state.inputs).then(res => {
      this.props.setUser(res.data);
    })
  }

  changeInput(e, input) {
    const val = e.target.value;
    this.setState(prev => {
    prev.inputs[input] = val;
    return prev;
    })
  }

  render() {

    return (
      <form onSubmit={this.signUp.bind(this)}>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><FontAwesome name="fas fa-user"/></InputGroup.Addon>
            <FormControl type="text" placeholder="First Name" value={this.state.inputs.first_name} onChange={e => this.changeInput(e, 'first_name')} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><FontAwesome name="fas fa-user"/></InputGroup.Addon>
            <FormControl type="text" placeholder="Last Name" value={this.state.inputs.last_name} onChange={e => this.changeInput(e, 'last_name')} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><FontAwesome name="fas fa-at"/></InputGroup.Addon>
            <FormControl type="email" placeholder="Email" value={this.state.inputs.email} onChange={e => this.changeInput(e, "email")} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><FontAwesome name="fas fa-unlock-alt"/></InputGroup.Addon>
            <FormControl type="password" placeholder="Password" value={this.state.inputs.password} onChange={e => this.changeInput(e, "password")} />
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <InputGroup>
            <InputGroup.Addon><FontAwesome name="fas fa-unlock-alt"/></InputGroup.Addon>
            <FormControl type="password" placeholder="Confirm password" value={this.state.inputs.password_confirmation} onChange={e => this.changeInput(e, 'password_confirmation')} />
          </InputGroup>
        </FormGroup>
        <ButtonGroup>
          <Button type="submit">Sign Up</Button>
          <Button onClick={this.props.toggleMode}>Back to Log In</Button>
        </ButtonGroup>
        </form>
    );
  }
}

export default Signup;