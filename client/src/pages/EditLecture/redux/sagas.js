import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { getLectureEdit, updateLecture } from "./middlewares";
import { toast } from "react-toastify";

function* getLectureEditSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(getLectureEdit, action.payload);
    yield put({
      type: types.GET_LECTURE_EDIT_SUCCESSFUL,
      payload,
    });
    yield put({
      type: types.RESET_UPDATE_SUCCESS,
    });
  } catch (error) {
    yield put({
      type: types.GET_LECTURE_EDIT_FAILURE,
      payload: error,
    });
  }
}

function* updateLectureSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(updateLecture, action.payload);
    yield put({
      type: types.UPDATE_LECTURE_SUCCESSFUL,
      payload,
    });
    yield call(toast.dark, "Lecture has been updated successfully.");
  } catch (error) {
    yield put({
      type: types.UPDATE_LECTURE_SUCCESSFUL,
      payload: error,
    });
    yield call(toast.error, "Could not update, please try again");
  }
}

export function* watchGetLectureEditSaga() {
  yield takeLatest(types.GET_LECTURE_EDIT, getLectureEditSaga);
}

export function* watchUpdateLectureSaga() {
  yield takeLatest(types.UPDATE_LECTURE, updateLectureSaga);
}
