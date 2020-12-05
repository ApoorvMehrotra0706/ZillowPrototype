import { LOGIN, REGISTER, LOGOUT } from "./../action/actionTypes";

const initialState = { loginFlag: false, name: "" };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case REGISTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "REFRESHFLAGS": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
