import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import getMyLearning from "./middlewares";

function* getMyLearningSaga(action) {
  try {
    const payload = yield call(getMyLearning, action.payload);
    console.log(payload);
    yield put({
      type: types.GET_MY_LEARNING_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_MY_LEARNING_FAILURE,
    });
  }
}

export default function* watchGetMyLearningSaga() {
  yield takeLatest(types.GET_MY_LEARNING, getMyLearningSaga);
}
