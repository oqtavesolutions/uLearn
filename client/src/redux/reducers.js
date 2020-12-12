import { combineReducers } from "redux";
import userSignup from "../pages/Signup/redux/reducers";
import userLogin from "../pages/Login/redux/reducers";
import createCourse from "../pages/CreateCourse/redux/reducers";
import getCourseEdit from "../pages/EditCourse/redux/reducers";
import getCoursesByUser from "../pages/MyCourses/redux/reducers";
import getLectureEdit from "../pages/EditLecture/redux/reducers";
import * as types from "./constants";

const initialState = {
  loading: true,
  isLoggedIn: false,
  success: false,
  error: "",
};

const userStatus = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_USER_STATUS:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USER_STATUS_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        success: true,
        isLoggedIn: true,
        error: "",
      };
    case types.GET_USER_STATUS_FAILURE:
      return {
        ...state,
        loading: false,
        success: false,
        isLoggedIn: false,
        error: "",
      };
    default:
      return state;
  }
};

export default combineReducers({
  userSignup,
  userLogin,
  userStatus,
  createCourse,
  getCourseEdit,
  getCoursesByUser,
  getLectureEdit,
});
