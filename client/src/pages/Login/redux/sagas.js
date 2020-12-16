import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import userLogin from "./middlewares";
import history from "../../../utils/history";
import { toast } from "react-toastify";

function forwardTo(location) {
  history.push(location);
}

function* userLoginSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(userLogin, action.payload);
    yield put({
      type: types.USER_LOGIN_SUCCESSFUL,
      payload,
    });
    yield call(forwardTo, "/dashboard");
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FAILURE,
    });
    yield call(toast.error, "Invalid username or password");
  }
}

export default function* watchUserLogin() {
  yield takeLatest(types.USER_LOGIN, userLoginSaga);
}
