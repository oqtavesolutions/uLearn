import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  courseDetails: {},
};

const createCourse = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_COURSE:
      return { ...state, loading: true };
    case types.CREATE_COURSE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
        courseDetails: action.payload,
      };
    case types.CREATE_COURSE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        courseDetails: {},
      };
    default:
      return state;
  }
};

export default createCourse;
