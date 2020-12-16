import * as types from "./constants";

export const changePassword = (payload) => {
  return {
    type: types.CHANGE_PASSWORD,
    payload,
  };
};
