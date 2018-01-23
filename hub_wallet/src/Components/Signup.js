import React, { Component } from 'react';
import axios from 'axios';

// component for sign up
// this will render if the mode in user auth is signup
class Signup extends Component {
  constructor(){
    super();
    // set up initial state
    this.state = { // track inputs for form
      inputs: {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  }

  // method to sign up
  signUp(e){
    e.preventDefault(); // prevent default form action
    // make request to server to create a new user
    axios.post(`${this.props.url}/users`, this.state.inputs)
      .then(res => { // the response will be the user
        // set the user
        this.props.setUser(res.data);
      })
  }

  // method to change one of the inputs
  changeInput(e, input){
    const val = e.target.value;
    this.setState(prev => { // set the input in the state to the value
      prev.inputs[input] = val;
      return prev;
    });
  }

  render(){
    return(
      <div>
      <section>
      <div className='loginBackground'>
      </div>
      <div className="signUp-auth-form">
        <div className='loginHead'><h1>Hub Wallet</h1></div>

        <form className='signUpForm' onSubmit={this.signUp.bind(this)}>

          <label htmlFor='email'>First Name</label>
          <input className='searchBar'value={this.state.inputs.first_name}
            id='first_name' name='first_name' type='text'
            onChange={e => this.changeInput(e, 'first_name')}
          />

          <label htmlFor='email'>Last Name</label>
          <input className='searchBar' value={this.state.inputs.last_name}
            id='last_name' name='last_name' type='text'
            onChange={e => this.changeInput(e, 'last_name')}
          />

          <label htmlFor='email'>Email</label>
          <input className='searchBar' value={this.state.inputs.email}
            id='email' name='email' type='email'
            onChange={e => this.changeInput(e, 'email')}
          />

          <label htmlFor='password'>Password</label>
          <input className='searchBar' value={this.state.inputs.password}
            id='password' name='password' type='password'
            onChange={e => this.changeInput(e, 'password')}
          />

          <label htmlFor='password_confirmation'>Password Confirmation</label>
          <input className='searchBar' value={this.state.inputs.password_confirmation}
            id='password_confirmation'
            name='password_confirmation' type='password'
            onChange={e => this.changeInput(e, 'password_confirmation')}
          />

          <div className="signUp-form-buttons">
            <button type="submit" className="signup-form-button">Sign Up</button>
            <button onClick={this.props.toggleMode} className="signup-form-button">Back to Log In</button>
          </div>

        </form>
      </div>
      </section>
      </div>
    )
  }
}

export default Signup;
