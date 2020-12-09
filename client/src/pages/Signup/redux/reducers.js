import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

const userSignup = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_SIGNUP:
      return { ...state, loading: true };
    case types.USER_SIGNUP_SUCCESSFUL:
      return { ...state, loading: false, success: true, error: "" };
    case types.USER_SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default userSignup;
