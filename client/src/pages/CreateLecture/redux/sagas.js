import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import createLecture from "./middlewares";
import history from "../../../utils/history";

function forwardTo(location) {
  history.push(location);
}

function* createLectureSaga(action) {
  try {
    const payload = yield call(createLecture, action.payload);
    yield put({
      type: types.CREATE_LECTURE_SUCCESSFUL,
      payload,
    });
    yield call(forwardTo, "/edit/course/" + payload.course_id);
  } catch (error) {
    yield put({
      type: types.CREATE_LECTURE_FAILURE,
    });
  }
}

export default function* watchCreateLectureSaga() {
  yield takeLatest(types.CREATE_LECTURE, createLectureSaga);
}
