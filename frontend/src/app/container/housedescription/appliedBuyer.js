import React from "react";
import { Modal, Button, Form, Alert, Table } from "react-bootstrap";
import configPath from "../../../config";
import axios from "axios";
import { connect } from "react-redux";
import { search1 } from "../../../action/getAppliedAction";

class AppliedBuyer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var payload = {
      ListingID: this.props.homeID,
      Filter: "All",
    };
    if (
      localStorage.getItem("role") == "Landlord" ||
      localStorage.getItem("role") == "Seller"
    ) {
      payload["OwnerID"] = localStorage.getItem("_id");
    } else if (localStorage.getItem("role") == "Realtor") {
      payload["OwnerID"] = localStorage.getItem("_id");
    }
    this.props.dispatch(search1(payload));
  }

  changeUserStatus = (e, ApplicantID, ListingID, ApplicationID) => {
    let data = {
      Status: e.target.value,
      ApplicantID,
      ListingID,
      ApplicationID,
    };
    var payload = {
      ListingID: this.props.homeID,
      Filter: "All",
    };
    let link;
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    if (localStorage.getItem("role") == "Realtor") {
      data["RealtorID"] = localStorage.getItem("_id");
      link = "/realtor/processApplication";
    }
    if (localStorage.getItem("role") == "Landlord") {
      data["LandlordID"] = localStorage.getItem("_id");
      link = "/landlord/processApplication";
    }
    if (localStorage.getItem("role") == "Seller") {
      data["SellerID"] = localStorage.getItem("_id");
      link = "/seller/processApplication";
    }

    axios
      .post(configPath.api_host + link, data)
      .then((response) => {
        console.log("Status Code : ", response.status);

        if (response.status === 201) {
          this.props.dispatch(search1(payload));
          alert("Status updated");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    let th;
    var list = this.props.applied.map(
      ({
        ApplicantID,
        _id,
        ApplicantName,
        Message,
        CreditScore,
        EmpInformation,
        PriceQuoted,
        Status,
        ListingID,
      }) => {
        let td;
        if (
          localStorage.getItem("role") == "Landlord" ||
          localStorage.getItem("role") == "Realtor"
        ) {
          td = (
            <>
              <td>{CreditScore}</td>
              <td>{EmpInformation}</td>
            </>
          );
        }
        console.log(Status);
        return (
          <tr>
            <td>{ApplicantName}</td>
            <td>{PriceQuoted}</td>
            <td>{Message}</td>
            {td}
            <td>
              <Form.Control
                as="select"
                value={Status}
                onChange={(e) => {
                  this.changeUserStatus(e, ApplicantID, ListingID, _id);
                }}
              >
                <option>Pending</option>
                <option>Rejected</option>
                <option>Accepted</option>
              </Form.Control>
            </td>
          </tr>
        );
      }
    );
    if (
      localStorage.getItem("role") == "Landlord" ||
      localStorage.getItem("role") == "Realtor"
    ) {
      th = (
        <>
          <th>Credit Score</th>
          <th>Employment</th>
        </>
      );
    }
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Applied Users</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Price Quoted</th>
                <th>Message</th>
                {th}
                <th>Status</th>
              </tr>
            </thead>
            <tbody>{list}</tbody>
          </Table>
        </Modal.Body>
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

const mapStateToProps = (state) => ({
  applied: state.applied.applied,
});

export default connect(mapStateToProps)(AppliedBuyer);
