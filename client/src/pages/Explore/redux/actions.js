import * as types from "./constants";

export const getExplorePageCourses = () => {
  return {
    type: types.GET_EXPLORE_PAGE_COURSES,
  };
};

export const getExplorePageCoursesByCategory = (category) => {
  return {
    type: types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY,
    payload: category,
  };
};
