import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import getCoursesByUser from "./middlewares";
import { toast } from "react-toastify";

function* getCoursesByUserSaga(action) {
  try {
    const payload = yield call(getCoursesByUser, action.payload);
    console.log(payload);
    yield put({
      type: types.GET_ALL_COURSES_BY_USER_AUTH_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_ALL_COURSES_BY_USER_AUTH_FAILURE,
      payload: error,
    });
    yield call(
      toast.error,
      "Could not load courses, please try again, or log out, log back in"
    );
  }
}

export default function* watchGetCoursesByUserSaga() {
  yield takeLatest(types.GET_ALL_COURSES_BY_USER_AUTH, getCoursesByUserSaga);
}
