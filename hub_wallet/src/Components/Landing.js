import React, { Component } from 'react';
import '../dist/toolkit-light.min.css';
import {
	Jumbotron,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Fade,
  Button,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalBody } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';

class Landing extends Component {

	constructor(props){
		super(props);
		this.state = { newUser: false, isOpen: false, modal: false }
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

	toggle(){
		this.setState({
      isOpen: !this.state.isOpen
    });
	}

	toggleModal(event){
		// console.log('event in toggleModal is', event.target.className);
		this.setState({
       modal: !this.state.modal
    });
    if (event.target.id === 'signup'){
    	this.setState({ newUser: true });
    }
    else if (event.target.id === 'login') {
    	this.setState({ newUser: false });
    }
	}

	toggleMode(event){
	event.preventDefault();
	this.setState(prev => {
			prev.newUser = prev.newUser === false ? true : false;
			return prev
		})
	}

render(){
	return(
		<div className="container">
			<Navbar color="light" light expand="md">
          <NavbarBrand><span className="icon icon-wallet sidebar-brand-icon"></span></NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <ButtonGroup>
				        <Button id='login' onClick={this.toggleModal} color="success">Login</Button>{' '}
				        <Button id='signup' onClick={this.toggleModal} color="primary">Sign Up</Button>{' '}
				      </ButtonGroup>
            </Nav>
          </Collapse>
        </Navbar>
     <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggleModal}>Login / Sign Up</ModalHeader>
          <ModalBody>
            {this.state.newUser === false ? (
							<Login {...this.props} toggleMode={this.toggleMode.bind(this)}/>
							) : (
							<Signup {...this.props} toggleMode={this.toggleMode.bind(this)}/>
							)}
          </ModalBody>
     </Modal>
		<Jumbotron>
    	<h1 className='display-3'>Hub Wallet<span className="icon icon-wallet sidebar-brand-icon"></span></h1>
    	<Fade timeout={5} in={true} tag="p" className="lead">
              Welcome to Hub Wallet! The Coin Market Cap companion application.
      </Fade>
     	<hr className="my-2" />
      <p className="lead">
          <Button id='login' onClick={this.toggleModal} color="primary">Log In</Button>
      </p>
    </Jumbotron>
		</div>
		)
	}
}

export default Landing;