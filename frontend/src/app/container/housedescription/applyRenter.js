import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import configPath from "../../../config";
import axios from "axios";
import { connect } from "react-redux";
import { search1 } from "../../../action/listingAction";

class ApplyRenter extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ApplyRenter;
