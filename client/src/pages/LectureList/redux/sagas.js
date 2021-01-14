import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { getCourseLectureList } from "./middlewares";

function* getCourseLectureListSaga(action) {
  console.log("Edit course");

  try {
    const payload = yield call(getCourseLectureList, action.payload);

    yield put({
      type: types.GET_COURSE_LECTURE_LIST_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: types.GET_COURSE_LECTURE_LIST_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetCourseLectureListSaga() {
  yield takeLatest(types.GET_COURSE_LECTURE_LIST, getCourseLectureListSaga);
}
