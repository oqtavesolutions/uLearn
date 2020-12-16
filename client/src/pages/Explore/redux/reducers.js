import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  courses: [],
  error: "",
};

const getExplorePageCourses = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_EXPLORE_PAGE_COURSES:
    case types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY:
      return { ...state, loading: true };
    case types.GET_EXPLORE_PAGE_COURSES_SUCCESSFUL:
    case types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        courses: action.payload.courses,
        error: "",
      };
    case types.GET_EXPLORE_PAGE_COURSES_FAILURE:
    case types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        courses: [],
      };
    default:
      return state;
  }
};

export default getExplorePageCourses;
