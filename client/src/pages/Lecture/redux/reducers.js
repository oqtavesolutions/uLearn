import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  lecture: {},
  error: "",
};

const getSingleLecture = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_SINGLE_LECTURE:
      return { ...state, loading: true };
    case types.GET_SINGLE_LECTURE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        lecture: action.payload.lecture,
        error: "",
      };
    case types.GET_SINGLE_LECTURE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        lecture: {},
        error: action.payload.message,
      };
    default:
      return state;
  }
};

export default getSingleLecture;
