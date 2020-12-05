import { LOGIN } from "./actionTypes";
import configPath from "../config";
import axios from "axios";
import jwt_decode from "jwt-decode";

//Log In Dispatcher
const loginDispatcher = (payload) => {
  return {
    type: LOGIN,
    payload,
  };
};

//refresh flags
export const refreshFlags = (payload) => {
  return {
    type: "REFRESHFLAGS",
    payload,
  };
};

//login thunk function. Delays dispatcher
export const login = (payload) => {
  return (dispatch) => {
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(configPath.api_host + "/housing/login", payload)
      .then((response) => {
        console.log("Status Code : ", response);
        if (response.status === 200) {
          localStorage.setItem("loginFlag", "true");
          localStorage.setItem("IDToken", response.data);
          const decoded = jwt_decode(response.data.split(" ")[1]);
          localStorage.setItem("_id", decoded._id);
          localStorage.setItem("emailID", decoded.email);
          localStorage.setItem("role", decoded.userrole);
          localStorage.setItem("name", decoded.name);
          dispatch(loginDispatcher({ ...decoded, loginFlag: true }));
        } else {
          alert("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          alert("Invalid Credentials");
          console.log("inside error of thunk ", {
            ...error.response.data,
            loginFlag: false,
          });
          dispatch(
            loginDispatcher({ ...error.response.data, loginFlag: false })
          );
        } else {
          alert("Invalid Credentials");
          dispatch(loginDispatcher({ res: "Network error", loginFlag: false }));
        }
      });
  };
};
