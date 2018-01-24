import React, { Component } from 'react';
import axios from 'axios';
import { Modal, OverlayTrigger, Button, Popover, Tooltip, ButtonToolbar } from 'react-bootstrap';
import commaNumber from 'comma-number';
import Addcoin from './Addcoin';

class Sidebar extends Component {

  constructor(props){
    super(props);
    this.state = {
      value: "",
      searchResults: [],
      searched: false,
      showModal: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchCoins = this.searchCoins.bind(this);
    // this.addCoin = this.addCoin.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({ showModal: false });
  }

  handleShow() {
    console.log('clicked');
    this.setState({ showModal: true });
  }
  
  handleChange(event) {
    event.preventDefault();
    this.setState({
      value: event.target.value, searched: true
    }, this.searchCoins)
  }

  searchCoins() {
    if (this.state.value === "") {
      this.setState({searched: false})
      return
    }
    else {
    axios.get(`${this.props.url}/api/search/${this.state.value}`)
    .then(res => {
      this.setState({searchResults: res.data.searchResults})
      console.log('search results are ', res.data.searchResults);
      })
    }
  }

  // addCoin(){
  //  return (
  //       <Modal show={this.state.showModal} onHide={this.handleClose}>
  //         <Modal.Header closeButton>
  //           <Modal.Title>Modal heading</Modal.Title>
  //         </Modal.Header>
  //         <Modal.Body>
  //           <h4>Text in a modal</h4>
  //           <p>
  //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
  //           </p>

  //           <h4>Popover in a modal</h4>
  //           <p>
  //             there is a{' '}
  //             <OverlayTrigger>
  //               <a href="#popover">popover</a>
  //             </OverlayTrigger>{' '}
  //             here
  //           </p>

  //           <h4>Tooltips in a modal</h4>
  //           <p>
  //             there is a{' '}
  //             <OverlayTrigger>
  //               <a href="#tooltip">tooltip</a>
  //             </OverlayTrigger>{' '}
  //             here
  //           </p>

  //           <hr />

  //           <h4>Overflowing text to show scroll behavior</h4>
  //           <p>
  //             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
  //             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
  //             ac consectetur ac, vestibulum at eros.
  //           </p>
  //           <p>
  //             Praesent commodo cursus magna, vel scelerisque nisl consectetur
  //             et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
  //             auctor.
  //           </p>
  //           <p>
  //             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
  //             cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
  //             dui. Donec ullamcorper nulla non metus auctor fringilla.
  //           </p>
  //           <p>
  //             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
  //             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
  //             ac consectetur ac, vestibulum at eros.
  //           </p>
  //           <p>
  //             Praesent commodo cursus magna, vel scelerisque nisl consectetur
  //             et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
  //             auctor.
  //           </p>
  //           <p>
  //             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
  //             cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
  //             dui. Donec ullamcorper nulla non metus auctor fringilla.
  //           </p>
  //           <p>
  //             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
  //             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
  //             ac consectetur ac, vestibulum at eros.
  //           </p>
  //           <p>
  //             Praesent commodo cursus magna, vel scelerisque nisl consectetur
  //             et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
  //             auctor.
  //           </p>
  //           <p>
  //             Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
  //             cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
  //             dui. Donec ullamcorper nulla non metus auctor fringilla.
  //           </p>
  //         </Modal.Body>
  //         <Modal.Footer>
  //           <Button onClick={this.handleClose}>Close</Button>
  //         </Modal.Footer>
  //       </Modal>
  //   )
  // }

  displaySearchResults() {
    let results = this.state.searchResults
    let renderSearch = []
    if (this.state.searchResults.length === 0) {
      return
    }
    else {
        results.map(e => {
        let price = commaNumber(e.price_usd);
        if (renderSearch.length < 5) {
          renderSearch.push(<p key={e.id}>{e.name} ({e.symbol}) - ${price}</p>)
          return renderSearch
        }
        else {
          return renderSearch
        }
    })
    return renderSearch
    }
  }

  render(){

    const logoStlye = {
      alignSelf: "center"
    }

    return (
      <div className="col-md-3 sidebar">
        <nav className="sidebar-nav">
          <div className="sidebar-header">
            <button className="nav-toggler nav-toggler-md sidebar-toggler" type="button" data-toggle="collapse" data-target="#nav-toggleable-md">
              <span className="sr-only">Toggle nav</span>
            </button>
            <a style={logoStlye} className="sidebar-brand img-responsive">
              <span className="icon icon-wallet sidebar-brand-icon"><span>Hub</span></span>
            </a>
          </div>
          <div className="collapse nav-toggleable-md" id="nav-toggleable-md">
            <form className="sidebar-form">
              <input className="form-control" type="text" ref={el=>{this.search=el}} placeholder="Search Coins..." onChange={this.handleChange} />
              <button type="submit" className="btn-link">
                <span className="icon icon-magnifying-glass"></span>
              </button>
              <ul className="list-group">{this.state.searched && this.displaySearchResults()}</ul>
            </form>
            <ul className="nav nav-pills nav-stacked flex-column">
              <li className="nav-header">{this.props.user.first_name} {this.props.user.last_name}'s Portfolio</li>
              <li className="nav-item">
                <a className="nav-link active" href="index.html">Current Holdings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="order-history/index.html">Profits & Losses</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="fluid/index.html">Tax Calculation</a>
              </li>
            </ul>
            <hr className="visible-xs mt-3"></hr>
          </div>
        </nav>
      </div>
    )
  }

}

export default Sidebar;