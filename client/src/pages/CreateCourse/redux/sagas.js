import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import createCourse, { uploadImage } from "./middlewares";
import history from "../../../utils/history";
import { toast } from "react-toastify";

function forwardTo(location) {
  history.push(location);
}

function* createCourseSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(createCourse, action.payload);
    console.log("payload ", payload.data.course_id);
    yield put({
      type: types.CREATE_COURSE_SUCCESSFUL,
      payload,
    });
    yield call(
      forwardTo,
      "/edit/course/" + payload.data.course_id + "?success=true"
    );
  } catch (error) {
    yield put({
      type: types.CREATE_COURSE_FAILURE,
      payload: error,
    });
    yield call(toast.error, "Creating course failed, please try again!");
  }
}

function* uploadCourseImageSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(uploadImage, action.payload);

    yield put({
      type: types.UPLOAD_IMAGE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.UPLOAD_IMAGE_FAILURE,
      payload: error,
    });
  }
}

export default function* watchCreateCourse() {
  yield takeLatest(types.CREATE_COURSE, createCourseSaga);
}

export function* watchUploadCourseImageSaga() {
  yield takeLatest(types.UPLOAD_IMAGE, uploadCourseImageSaga);
}
