import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
};

const createLecture = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_LECTURE:
      return { ...state, loading: true };
    case types.CREATE_LECTURE_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        error: "",
      };
    case types.CREATE_LECTURE_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        lecture: {},
      };
    default:
      return state;
  }
};

export default createLecture;
