import {
    ADMIN,
    LOGOUT,
  } from "../action/actionTypes";

const initialState = {
    userList: [],
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    console.log(payload);
    switch (type) {
      case LOGOUT:
        return {
            userList: [],
        };
  
      case ADMIN:
        return { ...state, userList: payload };
      default:
        return state;
    }
  }