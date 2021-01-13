import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  courseDetails: {},
  uploadImage: {
    loading: false,
    success: false,
    error: "",
    file_url: "",
  },
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

    case types.UPLOAD_IMAGE:
      return {
        ...state,
        uploadImage: {
          ...state.uploadImage,
          loading: true,
          success: false,
          error: "",
        },
      };
    case types.UPLOAD_IMAGE_SUCCESSFUL:
      return {
        ...state,
        uploadImage: {
          ...state.uploadImage,
          loading: false,
          success: true,
          error: "",
          file_url: action.payload.file_url,
        },
      };
    case types.UPLOAD_IMAGE_FAILURE:
      return {
        ...state,
        uploadImage: {
          ...state.uploadImage,
          loading: false,
          success: false,
          error: "file upload failed",
        },
      };
    default:
      return state;
  }
};

export default createCourse;
