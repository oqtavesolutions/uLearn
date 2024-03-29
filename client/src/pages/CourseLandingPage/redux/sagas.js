import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import {
  getCourseLandingPage,
  getCourseLandingPageLoggedInUser,
  enrollInCourse,
} from "./middlewares";

function* getCourseLandingPageSaga(action) {
  try {
    const payload = yield call(getCourseLandingPage, action.payload);
    yield put({
      type: types.GET_COURSE_LANDING_PAGE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_COURSE_LANDING_PAGE_FAILURE,
    });
  }
}

function* getCourseLandingPageLoggedInUserSaga(action) {
  try {
    const payload = yield call(
      getCourseLandingPageLoggedInUser,
      action.payload
    );
    yield put({
      type: types.GET_COURSE_LANDING_PAGE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_COURSE_LANDING_PAGE_FAILURE,
    });
  }
}

function* enrollInCourseSaga(action) {
  try {
    const payload = yield call(enrollInCourse, action.payload);
    yield put({
      type: types.ENROLL_IN_COURSE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.ENROLL_IN_COURSE_FAILURE,
    });
  }
}

export function* watchGetCourseLandingPageSaga() {
  yield takeLatest(types.GET_COURSE_LANDING_PAGE, getCourseLandingPageSaga);
}

export function* watchGetCourseLandingPageLoggedInUserSaga() {
  yield takeLatest(
    types.GET_COURSE_LANDING_PAGE_LOGGEDIN_USER,
    getCourseLandingPageLoggedInUserSaga
  );
}

export function* watchEnrollInCourseSaga() {
  yield takeLatest(types.ENROLL_IN_COURSE, enrollInCourseSaga);
}
