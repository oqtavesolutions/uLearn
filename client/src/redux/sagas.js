import { fork, call, takeLatest, put } from "redux-saga/effects";
import watchUserLogin from "../pages/Login/redux/sagas";
import watchUserSignup from "../pages/Signup/redux/sagas";
import watchCreateCourse from "../pages/CreateCourse/redux/sagas";
import userStatus from "./middleware";
import * as types from "./constants";

function* userStatusSaga(action) {
  try {
    const payload = yield call(userStatus, action.payload);
    yield put({
      type: types.GET_USER_STATUS_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    console.log("errror", error);
    yield put({
      type: types.GET_USER_STATUS_FAILURE,
    });
  }
}

function* watchUserStatusSaga() {
  yield takeLatest(types.GET_USER_STATUS, userStatusSaga);
}

export default function* rootSaga() {
  yield fork(watchUserSignup);
  yield fork(watchUserLogin);
  yield fork(watchUserStatusSaga);
  // create course
  yield fork(watchCreateCourse);
}
