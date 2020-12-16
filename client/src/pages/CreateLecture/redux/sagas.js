import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import createLecture from "./middlewares";
import history from "../../../utils/history";
import { toast } from "react-toastify";

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
    //edit/course/88b672d8-3edb-11eb-9048-a486b3eb84cf/lecture/a2bfb270-3edb-11eb-9048-a486b3eb84cf
    yield call(
      forwardTo,
      "/edit/course/" +
        payload.course_id +
        "/lecture/" +
        payload.lecture_id +
        "?success=true"
    );
  } catch (error) {
    yield put({
      type: types.CREATE_LECTURE_FAILURE,
      payload: error,
    });
    yield call(toast.error, "Creating lecture failed, please try again!");
  }
}

export default function* watchCreateLectureSaga() {
  yield takeLatest(types.CREATE_LECTURE, createLectureSaga);
}
