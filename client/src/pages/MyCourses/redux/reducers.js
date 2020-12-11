import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  courses: [],
  error: "",
};

const getCoursesByUser = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_COURSES_BY_USER_AUTH:
      return { ...state, loading: true };
    case types.GET_ALL_COURSES_BY_USER_AUTH_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        courses: action.payload.courses,
        error: "",
      };
    case types.GET_ALL_COURSES_BY_USER_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        courses: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default getCoursesByUser;
