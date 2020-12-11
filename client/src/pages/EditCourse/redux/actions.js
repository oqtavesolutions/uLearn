import * as types from "./constants";

export const getCourseEdit = (courseId) => {
  console.log("action", courseId);
  return {
    type: types.GET_COURSE_EDIT,
    payload: courseId,
  };
};
