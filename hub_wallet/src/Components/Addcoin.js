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
        <div id="docsModal" className={this.props.modalClass} tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" style={{display: this.props.style}} aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title" id="myModalLabel">Add {this.props.coin} ({this.props.symbol}) Shares:</h4>
                  <button onClick={this.props.closeModal} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden={this.props.aria}>×</span></button>
                </div>
                <div className="modal-body">
                  <p>{this.props.id}</p>
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