import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  course: {},
  error: "",
};

const getCourseEdit = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSE_EDIT:
      return { ...state, course: {}, loading: true };
    case types.GET_COURSE_EDIT_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
        course: action.payload.course,
      };
    case types.GET_COURSE_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        course: {},
      };
    default:
      return state;
  }
};

export default getCourseEdit;
