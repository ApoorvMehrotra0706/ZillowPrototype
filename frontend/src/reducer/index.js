import { combineReducers } from "redux";
import loginRegister from "./loginRegister";
import search from "./listing";
import admin from "./admin";
import favHomes from "./favHomes";
import favSearch from "./favSearch";
import myHomes from "./myHomes";
import applied from "./applications";

const allReducers = combineReducers({
  loginRegister,
  search,
  admin,
  favHomes,
  myHomes,
  favSearch,
  applied,
});

export default allReducers;
