import { GET_APPLIED, LOGOUT } from "../action/actionTypes";

const initialState = {
  applied: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  console.log(payload);
  switch (type) {
    case LOGOUT:
      return {
        applied: [],
      };

    case GET_APPLIED:
      return { ...state, applied: payload };
    default:
      return state;
  }
}
