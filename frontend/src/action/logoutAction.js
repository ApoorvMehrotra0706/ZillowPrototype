import { LOGOUT } from "./actionTypes";
import configPath from "../config";
import axios from "axios";

export const logOut = (payload) => {
  localStorage.clear();
  console.log("Inside logout action");
  return {
    payload,
    type: LOGOUT,
  };
};
