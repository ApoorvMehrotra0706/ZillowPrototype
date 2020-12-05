import { GET_APPLIED } from "./actionTypes";
import configPath from "../config";
import axios from "axios";

const searchDispatcher = (payload) => {
  console.log("Inside registerCustomerDispatcher action");
  console.log("payload", payload);
  return {
    type: GET_APPLIED,
    payload,
  };
};

//Delayed dispatch to make async call for Customer data
export const search1 = (payload) => {
  console.log("Inside listingAction thunk");

  return (dispatch) => {
    //set the with credentials to true
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    //make a post request with the user data
    let link;
    if (localStorage.getItem("role") == "Realtor") {
      link = "/realtor/getApplications";
    }
    if (localStorage.getItem("role") == "Landlord") {
      link = "/landlord/getApplications";
    }
    if (localStorage.getItem("role") == "Seller") {
      link = "/seller/getApplications";
    }
    axios
      .get(configPath.api_host + link, { params: payload })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          dispatch(searchDispatcher(response.data));
        } else {
          dispatch(searchDispatcher(response.data));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          dispatch(searchDispatcher(error.response.data));
        } else {
          dispatch(
            searchDispatcher({
              res: "Network error",
            })
          );
        }
      });
  };
};
