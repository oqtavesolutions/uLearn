import * as types from "./constants";

export const getCoursesByUser = () => {
  console.log("action");
  return {
    type: types.GET_ALL_COURSES_BY_USER_AUTH,
  };
};
