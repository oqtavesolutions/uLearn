import { fork, call, takeLatest, put } from "redux-saga/effects";
import watchUserLogin from "../pages/Login/redux/sagas";
import watchUserSignup from "../pages/Signup/redux/sagas";
import watchCreateCourse, {
  watchUploadCourseImageSaga,
} from "../pages/CreateCourse/redux/sagas";
import userStatus from "./middleware";
import * as types from "./constants";
import {
  watchGetCourseEditSaga,
  watchUpdateCourseSaga,
  watchUpdateImageSaga,
} from "../pages/EditCourse/redux/sagas";

import { watchGetCourseLectureListSaga } from "../pages/LectureList/redux/sagas";

import watchGetCoursesByUserSaga from "../pages/MyCourses/redux/sagas";
import {
  watchGetLectureEditSaga,
  watchUpdateLectureSaga,
} from "../pages/EditLecture/redux/sagas";
import watchCreateLectureSaga from "../pages/CreateLecture/redux/sagas";
import {
  watchEnrollInCourseSaga,
  watchGetCourseLandingPageLoggedInUserSaga,
  watchGetCourseLandingPageSaga,
} from "../pages/CourseLandingPage/redux/sagas";
import { watchGetSingleLectureSaga } from "../pages/Lecture/redux/sagas";
import {
  watchGetAuthorEditSaga,
  watchUpdateAuthorImageSaga,
  watchUpdateAuthorSaga,
} from "../pages/MyPage/redux/sagas";
import {
  watchGetExplorePageCoursesByCategorySaga,
  watchGetExplorePageCoursesSaga,
} from "../pages/Explore/redux/sagas";

import watchGetMyLearningSaga from "../pages/MyLearning/redux/sagas";
import { watchChangePasswordSaga } from "../pages/MyAccount/redux/sagas";

function* userStatusSaga(action) {
  try {
    const payload = yield call(userStatus, action.payload);
    yield put({
      type: types.GET_USER_STATUS_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_USER_STATUS_FAILURE,
      payload: error,
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
  yield fork(watchUploadCourseImageSaga);
  // get edit course
  yield fork(watchGetCourseEditSaga);
  yield fork(watchUpdateImageSaga);
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
  // get lecture after enroll
  yield fork(watchGetSingleLectureSaga);
  // get edit author
  yield fork(watchGetAuthorEditSaga);
  yield fork(watchUpdateAuthorImageSaga);
  // get edit update
  yield fork(watchUpdateAuthorSaga);
  // get courses for explore page
  yield fork(watchGetExplorePageCoursesSaga);
  // get courses for explore page by category
  yield fork(watchGetExplorePageCoursesByCategorySaga);
  // enroll button on course page
  yield fork(watchEnrollInCourseSaga);
  // get all my learnings
  yield fork(watchGetMyLearningSaga);
  // update current password
  yield fork(watchChangePasswordSaga);
}
