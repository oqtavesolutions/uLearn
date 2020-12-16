import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

const changePassword = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_PASSWORD:
      return { ...state, loading: true };
    case types.CHANGE_PASSWORD_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
      };
    case types.CHANGE_PASSWORD_FAILURE:
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

export default changePassword;
