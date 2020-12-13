import * as types from "./constants";

export const createLecture = (payload) => {
  console.log("action");
  return {
    type: types.CREATE_LECTURE,
    payload,
  };
};
