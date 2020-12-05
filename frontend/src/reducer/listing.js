import {
    SEARCH,
    GET_LISTING,
    LOGOUT,
  } from "../action/actionTypes";

const initialState = {
    listing: [],
    allListing: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
      case GET_LISTING:
        return {
          ...state,
          listing: payload,
        };
  
      case LOGOUT:
        return {
            listing: [],
            allListing: [],
        };
  
      case SEARCH:
        return { ...state, allListing: payload };
      default:
        return state;
    }
  }