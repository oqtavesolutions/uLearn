import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  isLoggedIn: false,
  error: false,
};

const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        isLoggedIn: false,
      };
    case types.USER_LOGIN_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        isLoggedIn: true,
        error: "",
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        isLoggedIn: false,
        error: true,
      };
    default:
      return state;
  }
};

export default userLogin;
