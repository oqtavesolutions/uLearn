import * as types from "./constants";

export const createCourse = (payload) => {
  console.log("action");
  return {
    type: types.CREATE_COURSE,
    payload,
  };
};
