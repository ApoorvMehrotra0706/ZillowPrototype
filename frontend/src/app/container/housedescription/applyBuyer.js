import React from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import configPath from "../../../config";
import axios from "axios";
import { connect } from "react-redux";

class ApplyBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      OwnerID: "",
      RealtorID: "",
      PriceQuoted: "",
      Message: "",
    };
  }

  componentDidMount() {
    var data = this.props.get_listing[0];
    if (data !== undefined)
      this.setState({
        OwnerID: data.OwnerID,
        RealtorID: data.RealtorID,
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.get_listing != this.props.get_listing) {
      var data = this.props.get_listing[0];
      if (data !== undefined)
        this.setState({
          OwnerID: data.OwnerID,
          RealtorID: data.RealtorID,
        });
    }
  }

  applyRenter = () => {
    //console.log(this.state);
    let error = 0;
    console.log(this.state.PriceQuoted);
    if (this.state.PriceQuoted === "") {
      this.setState({
        Error: "Price is mandatory",
      });
      error = 1;
    }

    // if (this.state.file === null || this.state.file.length < 1) {
    //   this.setState({
    //     Error: "File is mandatory",
    //   });
    //   error = 1;
    // }
    if (error === 0) {
      //const fd = new FormData();
      var PriceQuoted = Number(this.state.PriceQuoted, 10);
      let data = {
        ApplicantID: localStorage.getItem("_id"),
        ApplicantName: localStorage.getItem("name"),
        ApplicantEmail: localStorage.getItem("emailID"),
        PriceQuoted,
        Message: this.state.Message,
        OwnerID: this.state.OwnerID,
        ListingID: this.props.homeID,
      };
      // for (let i = 0; i <= this.state.file.length; i++) {
      //   fd.append("file" + i, this.state.file[i]);
      // }
      var link;
      axios.defaults.headers.common.authorization = localStorage.getItem(
        "IDToken"
      );

      axios
        .post(configPath.api_host + `/buyer/fileApplication`, data)
        .then((response) => {
          console.log("Status Code : ", response.status);
          if (response.status === 201) {
            this.props.handleClose();
            //this.dispatchAction();
            alert("Successfully Applied");
          } else {
            this.props.handleClose();
            //this.dispatchAction();
            alert("Already Applied");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Apply</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Price Quoted</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Price"
              value={this.state.PriceQuoted}
              onChange={(e) => {
                this.setState({ PriceQuoted: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Message</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Message"
              value={this.state.Message}
              onChange={(e) => {
                this.setState({ Message: e.target.value });
              }}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.applyRenter}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  get_listing: state.search.listing,
});

export default connect(mapStateToProps)(ApplyBuyer);
