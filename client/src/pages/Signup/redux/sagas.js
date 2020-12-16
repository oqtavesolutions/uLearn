import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import userSignup from "./middlewares";
import history from "../../../utils/history";
import { toast } from "react-toastify";

function forwardTo(location) {
  history.push(location);
}

function* userSignupSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(userSignup, action.payload);
    yield put({
      type: types.USER_SIGNUP_SUCCESSFUL,
      payload,
    });
    yield call(toast.success, "You have signed up successfully!");
    yield call(forwardTo, "/login");
  } catch (error) {
    yield put({
      type: types.USER_SIGNUP_FAILURE,
    });
    yield call(toast.error, "Signup failed, please try again!");
  }
}

export default function* watchUserSignup() {
  yield takeLatest(types.USER_SIGNUP, userSignupSaga);
}
