import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  course: {},
  relation: "",
  isOwner: false,
  isSubscribed: false,
  error: "",
};

const getCourseLandingPage = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSE_LANDING_PAGE:
      return { ...state, loading: true };
    case types.GET_COURSE_LANDING_PAGE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        course: action.payload.course.course,
        relation: action.payload.course.user_id,
        isOwner: action.payload.course.isOwner || false,
        isSubscribed: action.payload.course.isSubscribed || false,
        error: "",
      };
    case types.GET_COURSE_LANDING_PAGE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        course: false,
        relation: "",
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default getCourseLandingPage;
