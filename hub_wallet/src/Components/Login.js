import React, { Component } from 'react'; 
import { FormGroup, FormControl, InputGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import FontAwesome from 'react-fontawesome';
import { ModalFooter, Button } from 'reactstrap';

// login component
// this will render when the user auth mode is set to login
class Login extends Component {
  constructor(){
    super();
    // set default state
    this.state = {
      // we have 2 inputs that we will be changing
      inputs: {
        email: '',
        password: ''
      }
    }
  }

  // method to log in
  login(e){
    e.preventDefault(); // prevent default form action
    // send request to make sure the email and password are correct
    axios.post(`${this.props.url}/login`, this.state.inputs)
      .then(res => { // set the user based off of the response
        this.props.setUser(res.data);
      })
  }

  // method to change an input
  changeInput(e, input){
    const val = e.target.value;
    this.setState(prev => { // sets the state for that input to the value
      prev.inputs[input] = val;
      return prev;
    });
  }

  render(){
    return(
        <Form onSubmit={this.login.bind(this)}>
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
        <ModalFooter>
          <Button type="submit" color="success">Log In</Button>
          <Button onClick={this.props.toggleMode} color="primary">Sign Up</Button>
        </ModalFooter>
        </Form>
    )
  }
}
export default Login;
