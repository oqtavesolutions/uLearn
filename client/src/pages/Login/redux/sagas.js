import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import userLogin from "./middlewares";

function* userLoginSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(userLogin, action.payload);
    yield put({
      type: types.USER_LOGIN_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.USER_LOGIN_FAILURE,
    });
  }
}

export default function* watchUserLogin() {
  yield takeLatest(types.USER_LOGIN, userLoginSaga);
}
