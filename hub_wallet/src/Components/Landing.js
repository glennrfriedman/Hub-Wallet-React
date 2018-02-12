import React, { Component } from 'react';
import '../dist/toolkit-light.min.css';
import {
	Jumbotron,
  Collapse, Navbar, NavbarToggler, NavbarBrand, Nav,
  Fade,
  Button, ButtonGroup,
  Modal, ModalHeader, ModalBody,
  Row, Col,
  ListGroup, ListGroupItem } from 'reactstrap';
import Login from './Login';
import Signup from './Signup';
import DesktopImg from '../Assets/desktop_mockup.png'
// import Background from '../Assets/milky-way-2695569_1280.jpg'
// import Iphone from '../Assets/iPhone.png'
// import News from '../Assets/news.png';
// import OneCoinImg from '../Assets/onecoin.png';
// import PortfolioImg from '../Assets/portfolio.png';

class Landing extends Component {

	constructor(props){
		super(props);
		this.state = { newUser: false, isOpen: false, modal: false }
		this.toggle = this.toggle.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
	}

  componentDidMount(){
    document.getElementById('sidebar').style.display = "none";
    // console.log('sidebar is ', sidebar); // let sidebar = 'none';
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
    <div>
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
		<Jumbotron className="container">
    	<h1 className='display-3'>Hub Wallet<span className="icon icon-wallet sidebar-brand-icon"></span></h1>
    	<Fade timeout={5} in={true} tag="p" className="lead">
              Welcome to Hub Wallet! The easiest way to keep track of your crypto.
      </Fade>
     	<hr className="my-2" />
      <p className="lead">
          <Button id='login' onClick={this.toggleModal} color="primary">Log In</Button>
      </p>
    </Jumbotron>
    <Row>
      <Col md="7">
        <img style={{ margin: "4%" }} width="100%" src={DesktopImg} alt="card1" />
      </Col>
      <Col md="3" style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
         <ListGroup>
            <ListGroupItem active style={{textAlign: "center", fontSize: "24px", color: "white"}}>Features</ListGroupItem>
            <ListGroupItem>Track Holdings</ListGroupItem>
            <ListGroupItem>Live Market Data</ListGroupItem>
            <ListGroupItem>Portfolio Graphs and Statistics</ListGroupItem>
            <ListGroupItem>Top Crypto News</ListGroupItem>
        </ListGroup>
      </Col>
    </Row>
		</div>
		)
	}
}

export default Landing;