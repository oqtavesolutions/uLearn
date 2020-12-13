import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { getLectureEdit, updateLecture } from "./middlewares";

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
  } catch (error) {
    yield put({
      type: types.UPDATE_LECTURE_SUCCESSFUL,
    });
  }
}

export function* watchGetLectureEditSaga() {
  yield takeLatest(types.GET_LECTURE_EDIT, getLectureEditSaga);
}

export function* watchUpdateLectureSaga() {
  yield takeLatest(types.UPDATE_LECTURE, updateLectureSaga);
}
