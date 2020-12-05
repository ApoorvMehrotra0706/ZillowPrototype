import { FAV_SEARCH } from "./actionTypes";
import configPath from "../config";
import axios from "axios";

const searchDispatcher = (payload) => {
  console.log("Inside registerCustomerDispatcher action");
  console.log("payload", payload);
  return {
    type: FAV_SEARCH,
    payload,
  };
};

//Delayed dispatch to make async call for Customer data
export const search1 = (payload) => {
  console.log("Inside registerCustomer thunk");

  return (dispatch) => {
    //set the with credentials to true
    axios.defaults.headers.common.authorization = localStorage.getItem(
      "IDToken"
    );
    //make a post request with the user data
    axios
      .get(configPath.api_host + "/housing/getFavoriteSearch", {
        params: payload,
      })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          dispatch(searchDispatcher(response.data.FavouriteSearches));
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          dispatch(
            searchDispatcher({
              ...error.response.data,
            })
          );
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
