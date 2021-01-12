import * as types from "./constants";

export const getCourseEdit = (courseId) => {
  return {
    type: types.GET_COURSE_EDIT,
    payload: courseId,
  };
};

export const updateCourse = (payload) => {
  return {
    type: types.UPDATE_COURSE,
    payload,
  };
};
