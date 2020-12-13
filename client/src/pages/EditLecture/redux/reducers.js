import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  lecture: {},
  updatedLecture: {
    loading: false,
    success: false,
    error: "",
  },
};

const getLectureEdit = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LECTURE_EDIT:
      return { ...state, loading: true };
    case types.GET_LECTURE_EDIT_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        lecture: action.payload.lecture,
        error: "",
      };
    case types.GET_LECTURE_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        lecture: {},
      };
    // update lecture

    case types.UPDATE_LECTURE:
      return {
        ...state,
        updatedLecture: {
          ...state.updatedLecture,
          loading: false,
        },
      };
    case types.UPDATE_LECTURE_SUCCESSFUL:
      return {
        ...state,
        updatedLecture: {
          ...state.updatedLecture,
          loading: false,
          success: true,
          error: "",
        },
      };
    case types.UPDATE_LECTURE_FAILURE:
      return {
        ...state,
        updatedLecture: {
          ...state.updatedLecture,
          loading: false,
          success: true,
          error: action.payload.message,
        },
      };
    case types.RESET_UPDATE_SUCCESS:
      return {
        ...state,
        updatedLecture: {
          ...state.updatedLecture,
          success: false,
        },
      };
    default:
      return state;
  }
};

export default getLectureEdit;
