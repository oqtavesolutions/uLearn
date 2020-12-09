import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  isLoggedIn: false,
  error: "",
};

const userLogin = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_LOGIN:
      return { ...state, loading: true };
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
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default userLogin;
