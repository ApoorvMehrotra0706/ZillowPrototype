import { REGISTER } from "./actionTypes";
import configPath from "../config";
import axios from "axios";

//Customer Register Dispatacher
const registerCustomerDispatcher = (payload) => {
  console.log("Inside registerCustomerDispatcher action");
  console.log("payload", payload);
  return {
    type: REGISTER,
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

//Delayed dispatch to make async call for Customer data
export const registerCustomer = (payload) => {
  console.log("Inside registerCustomer thunk");

  return (dispatch) => {
    //set the with credentials to true
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios
      .post(configPath.api_host + "/housing/signup", payload)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          dispatch(
            registerCustomerDispatcher({
              ...response.data,
              registerFlag: true,
            })
          );
        } else {
          alert(response)
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          alert("Invalid Input")
        }
      });
  };
};
