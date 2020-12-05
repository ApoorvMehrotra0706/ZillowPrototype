import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { registerCustomer, refreshFlags } from "../../../action/registerAction";
import { Redirect } from "react-router";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      emailID: "",
      Password: "",
      password2: "",
      matchPassword: true,
      Role: "",
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("inside handleSubmit");
    if (this.state.Password !== this.state.password2) {
      this.setState({ matchPassword: false });
    } else this.props.registerCustomer(this.state);
  };

  componentWillMount() {
    this.props.refreshFlags({ res: "", registerFlag: false });
  }

  render() {
    let printError = "";
    if (!this.state.matchPassword) {
      printError = "Password Mismatch!!!";
    }
    if (!this.props.registerFlag) {
      printError = this.props.res;
      console.log("Error is : ", printError);
    } else {
      console.log("Registerd Customer");
      return <Redirect to="/login" />;
    }
    return (
      <Container className="lscontainer">
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="loginForm">
              <h2>Register</h2>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="formBasicName">
                <Form.Label>Enter Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    onChange={(e) => this.setState({ Name: e.target.value })}
                    required
                  />
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ emailID: e.target.value })}
                    required
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      this.setState({ Password: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) =>
                      this.setState({ password2: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>User Type</Form.Label>
                  <Form.Control
                    as="select"
                    onChange={(e) => this.setState({ Role: e.target.value })}
                  >
                    <option>Seller</option>
                    <option>Buyer</option>
                    <option>Renter</option>
                    <option>Landlord</option>
                    <option>Admin</option>
                    <option>Realtor</option>
                  </Form.Control>
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
                <div>
                  <h4 style={{ color: "red", fontWeight: "800" }}>
                    {printError}
                  </h4>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.userReducer);
  return {
    res: state.loginRegister.res || "",
    registerFlag: state.loginRegister.registerFlag || false,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    registerCustomer: (payload) => dispatch(registerCustomer(payload)),
    refreshFlags: (payload) => dispatch(refreshFlags(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
