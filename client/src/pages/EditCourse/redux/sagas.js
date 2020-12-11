import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import getCourseEdit from "./middlewares";
//import history from "../../../utils/history";

// function forwardTo(location) {
//   history.push(location);
// }

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
    });
  }
}

export default function* watchGetCourseEditSaga() {
  yield takeLatest(types.GET_COURSE_EDIT, getCourseEditSaga);
}
