import * as types from "./constants";

export const getCourseLectureList = (courseId) => {
  return {
    type: types.GET_COURSE_LECTURE_LIST,
    payload: courseId,
  };
};
