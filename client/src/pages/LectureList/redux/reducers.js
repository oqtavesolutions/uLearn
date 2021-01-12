import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  lectures: [],
  error: "",
};

const getLectureList = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_COURSE_LECTURE_LIST:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case types.GET_COURSE_LECTURE_LIST_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
        lectures: action.payload.lectures,
      };
    case types.GET_COURSE_LECTURE_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        lectures: [],
      };

    default:
      return state;
  }
};

export default getLectureList;
