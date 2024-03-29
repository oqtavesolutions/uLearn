import * as types from "./constants";

export const getCourseLandingPage = (courseSlug) => {
  return {
    type: types.GET_COURSE_LANDING_PAGE,
    payload: courseSlug,
  };
};

export const getCourseLandingPageLoggedInUser = (courseSlug) => {
  return {
    type: types.GET_COURSE_LANDING_PAGE_LOGGEDIN_USER,
    payload: courseSlug,
  };
};

export const enrollInCourse = (courseSlug) => {
  return {
    type: types.ENROLL_IN_COURSE,
    payload: courseSlug,
  };
};
