import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import createCourse from "./middlewares";
import history from "../../../utils/history";

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
    yield call(forwardTo, "/edit/course/" + payload.data.course_id);
  } catch (error) {
    yield put({
      type: types.CREATE_COURSE_FAILURE,
    });
  }
}

export default function* watchCreateCourse() {
  yield takeLatest(types.CREATE_COURSE, createCourseSaga);
}
