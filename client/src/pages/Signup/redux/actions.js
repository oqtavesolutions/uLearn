import * as types from "./constants";

export const userSignup = (payload) => {
  console.log("action");
  return {
    type: types.USER_SIGNUP,
    payload,
  };
};
