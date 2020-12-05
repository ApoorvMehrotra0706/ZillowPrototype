import React from "react";
import { Container, Form, Col, Table, Row } from "react-bootstrap";
import { admin } from "../../../action/adminAction";
import { connect } from "react-redux";
import configPath from "../../../config";
import axios from "axios";

class customerInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "All",
    };
  }
  componentDidMount() {
    let payload = {
      Status: this.state.status,
    };
    this.props.dispatch(admin(payload));
  }

  changeStatus = (e) => {
    this.setState({
      status: e.target.value,
    });
    let payload = {
      Status: e.target.value,
    };
    this.props.dispatch(admin(payload));
  };

  changeUserStatus = (e, EmailID, Role) => {
    let data = {
      Status: e.target.value,
      EmailID,
      Role,
    };
    let payload = {
      Status: e.target.value,
    };
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );

    axios
      .post(configPath.api_host + `/admin/auditSignup`, data)
      .then((response) => {
        console.log("Status Code : ", response.status);
        if (response.status === 201) {
          this.props.dispatch(admin(payload));
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    let x = this.props.adminList.map(({ EmailID, Role, Status }) => {
      return (
        <tr>
          <td>{EmailID}</td>
          <td>{Role}</td>
          <td>
            <Form.Control
              as="select"
              value={Status}
              onChange={(e) => {
                this.changeUserStatus(e, EmailID, Role);
              }}
            >
              <option>Pending</option>
              <option>Accepted</option>
            </Form.Control>
          </td>
        </tr>
      );
    });
    return (
      <Container>
        <Row>
          <Col lg={2}>
            <Form.Group controlId="exampleForm.ControlSelect1">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={this.state.status}
                onChange={this.changeStatus}
              >
                <option>All</option>
                <option>Accepted</option>
                <option>Pending</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col lg={10}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email ID</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>{x}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  adminList: state.admin.userList,
});

export default connect(mapStateToProps)(customerInfo);
