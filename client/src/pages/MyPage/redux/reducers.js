import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  author: {
    author_name: "",
    author_bio: "",
    author_slug: "",
  },
  updatedAuthor: {
    loading: false,
    success: false,
    error: "",
    author: {},
  },
};

const getAuthorEdit = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_AUTHOR_EDIT:
      return { ...state, loading: true };
    case types.GET_AUTHOR_EDIT_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        author: action.payload.author,
        error: "",
      };
    case types.GET_AUTHOR_EDIT_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.payload.message,
        author: {},
      };
    // update lecture

    case types.UPDATE_AUTHOR:
      return {
        ...state,
        updatedAuthor: {
          ...state.updatedAuthor,
          loading: false,
        },
      };
    case types.UPDATE_AUTHOR_SUCCESSFUL:
      return {
        ...state,
        updatedAuthor: {
          ...state.updatedAuthor,
          loading: false,
          success: true,
          error: "",
        },
      };
    case types.UPDATE_AUTHOR_FAILURE:
      return {
        ...state,
        updatedLecture: {
          ...state.updatedAuthor,
          loading: false,
          success: true,
          error: action.payload.message,
        },
      };

    default:
      return state;
  }
};

export default getAuthorEdit;
