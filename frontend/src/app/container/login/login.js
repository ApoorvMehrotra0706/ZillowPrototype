import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { login, refreshFlags } from "../../../action/loginAction";
import { Redirect } from "react-router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailID: "",
      Password: "",
      authFlag: false,
      loginFlag: "",
      res: "",
      Role: "Seller",
    };
  }

  componentWillMount() {
    this.setState({
      loginFlag: this.props.loginFlag,
    });
    this.props.refreshFlags({ res: "", registerFlag: false });
  }

  //submit Login handler to send a request to the node backend
  submitLogin = (e) => {
    console.log("inside submit Login handler");
    //prevent page from refresh
    e.preventDefault();
    const userData = {
      Role: this.state.Role,
      EmailID: this.state.EmailID,
      Password: this.state.Password,
    };
    console.log(userData);
    this.props.login(userData);
  };

  render() {
    let redirectVar = null;
    let printError = null;
    if (!this.props.loginFlag) {
      printError = this.props.res;
      console.log("Error is : ", printError);
    } else {
      if(localStorage.getItem("role") != "Admin"){
        console.log("logged in");
        return <Redirect to="/houseListing" />;
      }else{
        return <Redirect to="/admin" />
      }
    }
    return (
      <Container>
        {redirectVar}
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div className="loginForm">
              <h2>Welcome Back!</h2>
              <Form onSubmit={this.submitLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ EmailID: e.target.value })}
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

                <Form.Group
                  controlId="formBasicPassword"
                  required
                >
                  <Form.Label>User Type</Form.Label>
                  <Form.Control as="select" defaultValue="Seller" onChange={(e) => this.setState({ Role: e.target.value })}
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
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    mongooseId: state.loginRegister.mongooseId || "",
    idToken: state.loginRegister.idToken || "",
    res: state.loginRegister.res || "",
    loginFlag: state.loginRegister.loginFlag || false,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (payload) => dispatch(login(payload)),
    refreshFlags: (payload) => dispatch(refreshFlags(payload)),
  };
};

//export Login Component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
