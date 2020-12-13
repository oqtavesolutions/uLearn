import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { getSingleLecture } from "./middlewares";

function* getSingleLectureSaga(action) {
  try {
    const payload = yield call(getSingleLecture, action.payload);
    yield put({
      type: types.GET_SINGLE_LECTURE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_SINGLE_LECTURE_FAILURE,
    });
  }
}

export function* watchGetSingleLectureSaga() {
  yield takeLatest(types.GET_SINGLE_LECTURE, getSingleLectureSaga);
}
