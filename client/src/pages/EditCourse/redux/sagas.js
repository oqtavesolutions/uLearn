import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { getCourseEdit, updateCourse, updateImage } from "./middlewares";
import { toast } from "react-toastify";

function* getCourseEditSaga(action) {
  console.log("Edit course");
  try {
    const payload = yield call(getCourseEdit, action.payload);
    console.log(payload);
    yield put({
      type: types.GET_COURSE_EDIT_SUCCESSFUL,
      payload,
    });
    //yield call(forwardTo, "/dashboard");
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_COURSE_EDIT_FAILURE,
      payload: error,
    });
    yield call(toast.error, "Could not load edit, please try again");
  }
}

function* updateCourseSaga(action) {
  console.log("update course");

  try {
    const payload = yield call(updateCourse, action.payload);

    yield put({
      type: types.UPDATE_COURSE_SUCCESSFUL,
      payload,
    });

    yield put({
      type: types.RESET_COURSE_UPDATE_SUCCESS,
    });

    yield call(toast.dark, "Course updated successfully");
  } catch (error) {
    console.log(error);
    yield put({
      type: types.UPDATE_COURSE_FAILURE,
    });
  }
}

function* updateCourseImageSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(updateImage, action.payload);

    yield put({
      type: types.UPDATE_IMAGE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_IMAGE_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetCourseEditSaga() {
  yield takeLatest(types.GET_COURSE_EDIT, getCourseEditSaga);
}
export function* watchUpdateCourseSaga() {
  yield takeLatest(types.UPDATE_COURSE, updateCourseSaga);
}

export function* watchUpdateImageSaga() {
  yield takeLatest(types.UPDATE_IMAGE, updateCourseImageSaga);
}
