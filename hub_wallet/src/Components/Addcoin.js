import React, { Component } from 'react';
import { Modal, Button, Popover, Tooltip } from 'react-bootstrap';

class Addcoin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { modalClass: this.props.modalClass, style: this.props.style, aria: this.props.aria };
    // this.handleModal = this.handleModal.bind(this);
    // this.handleClose = this.handleClose.bind(this);
  }

  // handleClose() {
  //   this.setState({ showModal: false }, () => {console.log(this.state.showModal)});
  // }

  // handleShow() {
  //   this.setState({ showModal: true }, () => {console.log(this.state.showModal)});
  // }
  
  render() {
      return (
        <div id="docsModal" className={this.state.modalClass} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: this.state.style}} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Example modal</h4>
                  <button onClick={this.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden={this.state.aria}>×</span></button>
                </div>
                <div className="modal-body">
                  <p>You're looking at an example modal in the dashboard theme.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-primary" data-dismiss="modal">Cool, got it!</button>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

export default Addcoin;