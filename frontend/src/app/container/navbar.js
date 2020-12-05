import React from "react";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Redirect, Link } from "react-router-dom";
import { logOut } from "../../action/logoutAction";
import { login } from "../../action/loginAction";

class Topnav extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
    this.props.logOut({ loginFlag: false });
  };

  render() {
    let xnav, redirect, nav;
    if (!localStorage.getItem("loginFlag")) {
      redirect = <Redirect to="/login" />;
    }
    if (
      localStorage.getItem("role") == "Seller" ||
      localStorage.getItem("role") == "Landlord" ||
      localStorage.getItem("role") == "Realtor"
    ) {
      nav = (
        <NavDropdown.Item eventKey="4.3">
          <Link to="/myproperties">My Properties</Link>
        </NavDropdown.Item>
      );
    }
    if (localStorage.getItem("loginFlag")) {
      let name = "Hi " + localStorage.getItem("name");
      console.log(this.props.name);
      xnav = (
        <Nav>
          <NavDropdown
            title={name}
            id="nav-dropdown"
            style={{ marginLeft: "-10px" }}
          >
            <NavDropdown.Item eventKey="4.1">
              <Link to="/favsearch">Favorite Search</Link>
            </NavDropdown.Item>
            <NavDropdown.Item eventKey="4.2">
              <Link to="/favhomes">Favorite Properties</Link>
            </NavDropdown.Item>
            {nav}
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={this.handleLogout}>
              <Link to="login">Logout</Link>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      );
    } else {
      xnav = (
        <Nav>
          <Nav.Link>
            <Link to="/login">Login</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/signup">SignUp</Link>
          </Nav.Link>
        </Nav>
      );
    }
    return (
      <div>
        {redirect}
        <Navbar>
          <div className="logo">
            <Navbar.Brand>
              <Link to="/houseListing">
                <img
                  src="/logo.png"
                  width="143.325"
                  height="30"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
                />
              </Link>
            </Navbar.Brand>
          </div>
          {xnav}
        </Navbar>
        <hr></hr>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  console.log(state.loginRegister.name);
  return {
    loginFlag: state.loginRegister.loginFlag,
    name: state.loginRegister.name,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (payload) => dispatch(logOut(payload)),
    login: (payload) => dispatch(login(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Topnav);
