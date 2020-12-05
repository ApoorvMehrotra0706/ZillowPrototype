import React from "react";
import topNav from "./navbar";
import login from "./login/login";
import signup from "./login/signup";
import listingPage from "./listingPage";
import { Route } from "react-router-dom";
import houseDescription from "./housedescription";
import { connect } from "react-redux";
import admin from "./admin/fetchCustomer";
import favhomes from "./favorites/listing";
import myproperties from "./mylisting/mylisting";
import favsearch from "./favorites/listSearch";

class bodyCont extends React.Component {
  render() {
    return (
      <div>
        <Route path="/" component={topNav} />
        <Route path="/login" component={login} />
        <Route path="/signup" component={signup} />
        <Route path="/houseListing" component={listingPage} />
        <Route path="/housedescription/:id" component={houseDescription} />
        <Route path="/admin" component={admin} />
        <Route path="/favhomes" component={favhomes} />
        <Route path="/myproperties" component={myproperties} />
        <Route path="/favsearch" component={favsearch} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state.userReducer);
  return {
    registerFlag: state.loginRegister.registerFlag || false,
  };
};

export default connect(mapStateToProps)(bodyCont);
