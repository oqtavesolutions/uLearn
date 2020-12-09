import * as types from "./constants";

export const userLogin = (payload) => {
  console.log("action");
  return {
    type: types.USER_LOGIN,
    payload,
  };
};
