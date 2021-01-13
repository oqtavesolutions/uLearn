import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  course: {},
  uploadImage: {
    loading: false,
    success: false,
    error: "",
    file_url: "",
  },
  updatedCourse: {
    loading: false,
    success: false,
    error: "",
  },
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
    // update course:

    case types.UPDATE_COURSE:
      return {
        ...state,
        updatedCourse: {
          ...state.lecturupdatedCoursees,
          loading: true,
        },
      };
    case types.UPDATE_COURSE_SUCCESSFUL:
      return {
        ...state,
        course: action.payload.course,
        updatedCourse: {
          ...state.updatedCourse,
          loading: false,
          success: true,
          error: "",
        },
      };
    case types.UPDATE_COURSE_FAILURE:
      return {
        ...state,
        updatedCourse: {
          ...state.updatedCourse,
          loading: false,
          success: false,
          error: action.payload.message,
        },
      };
    case types.RESET_COURSE_UPDATE_SUCCESS:
      return {
        ...state,
        updatedCourse: {
          ...state.updatedCourse,
          success: false,
        },
      };

    case types.UPDATE_IMAGE:
      return {
        ...state,
        uploadImage: {
          ...state.uploadImage,
          loading: true,
          success: false,
          error: "",
        },
      };
    case types.UPDATE_IMAGE_SUCCESSFUL:
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
    case types.UPDATE_IMAGE_FAILURE:
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

export default getCourseEdit;
