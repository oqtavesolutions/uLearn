import * as types from "./constants";

export const getCourseEdit = (courseId) => {
  return {
    type: types.GET_COURSE_EDIT,
    payload: courseId,
  };
};

export const getCourseLectureList = (courseId) => {
  return {
    type: types.GET_COURSE_LECTURE_LIST,
    payload: courseId,
  };
};

export const updateCourse = (payload) => {
  return {
    type: types.UPDATE_COURSE,
    payload,
  };
};
