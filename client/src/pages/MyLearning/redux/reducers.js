import * as types from "./constants";

const initialState = {
  loading: false,
  success: false,
  courses: [],
  error: "",
};

const getMyLearning = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_MY_LEARNING:
      return { ...state, loading: true };
    case types.GET_MY_LEARNING_SUCCESSFUL:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        success: true,
        courses: action.payload.courses,
        error: "",
      };
    case types.GET_MY_LEARNING_FAILURE:
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

export default getMyLearning;
