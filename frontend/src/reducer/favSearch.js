import { FAV_SEARCH, LOGOUT } from "../action/actionTypes";

const initialState = {
  allListing: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case LOGOUT:
      return {
        allListing: [],
      };

    case FAV_SEARCH:
      return { ...state, allListing: payload };
    default:
      return state;
  }
}
