import { fork, call, takeLatest, put } from "redux-saga/effects";
import watchUserLogin from "../pages/Login/redux/sagas";
import watchUserSignup from "../pages/Signup/redux/sagas";
import watchCreateCourse from "../pages/CreateCourse/redux/sagas";
import userStatus from "./middleware";
import * as types from "./constants";
import {
  watchGetCourseEditSaga,
  watchGetCourseLectureListSaga,
  watchUpdateCourseSaga,
} from "../pages/EditCourse/redux/sagas";
import watchGetCoursesByUserSaga from "../pages/MyCourses/redux/sagas";
import {
  watchGetLectureEditSaga,
  watchUpdateLectureSaga,
} from "../pages/EditLecture/redux/sagas";
import watchCreateLectureSaga from "../pages/CreateLecture/redux/sagas";
import {
  watchGetCourseLandingPageLoggedInUserSaga,
  watchGetCourseLandingPageSaga,
} from "../pages/CourseLandingPage/redux/sagas";

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
  // get edit course
  yield fork(watchGetCourseEditSaga);
  // get all course
  yield fork(watchGetCoursesByUserSaga);
  // get all lectures for that course
  yield fork(watchGetCourseLectureListSaga);
  // update course
  yield fork(watchUpdateCourseSaga);
  // get edit lecture
  yield fork(watchGetLectureEditSaga);
  // update lecture
  yield fork(watchUpdateLectureSaga);
  // create lecture
  yield fork(watchCreateLectureSaga);
  // get Course Landing page content
  yield fork(watchGetCourseLandingPageSaga);
  // get course landing page content user
  yield fork(watchGetCourseLandingPageLoggedInUserSaga);
}
