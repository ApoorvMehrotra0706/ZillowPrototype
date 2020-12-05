import { SEARCH } from "./actionTypes";
import configPath from "../config";
import axios from "axios";

const searchDispatcher = (payload) => {
  console.log("Inside registerCustomerDispatcher action");
  console.log("payload", payload);
  return {
    type: SEARCH,
    payload,
  };
};

//Delayed dispatch to make async call for Customer data
export const search = (payload) => {
  console.log("Inside registerCustomer thunk");
  return (dispatch) => {
    //set the with credentials to true
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    //make a post request with the user data
    axios
      .get(configPath.api_host + "/housing/searchListing", { params: payload })
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
