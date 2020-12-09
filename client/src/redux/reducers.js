import { combineReducers } from "redux";
import userSignup from "../pages/Signup/redux/reducers";
import userLogin from "../pages/Login/redux/reducers";
export default combineReducers({ userSignup, userLogin });
