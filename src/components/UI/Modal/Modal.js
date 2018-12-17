import React, { Component } from "react";

import "./Modal.css";
import Backdrop from "./Backdrop/Backdrop";

class Modal extends Component {
  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
        <div
          className="modal-1"
          style={{
            transform: this.props.show
              ? "translateY(-0vh)"
              : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0"
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
