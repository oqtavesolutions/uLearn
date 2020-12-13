import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { changePassword } from "./middlewares";

function* changePasswordSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(changePassword, action.payload);
    yield put({
      type: types.CHANGE_PASSWORD_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.CHANGE_PASSWORD_FAILURE,
      payload: error,
    });
  }
}

export function* watchChangePasswordSaga() {
  yield takeLatest(types.CHANGE_PASSWORD, changePasswordSaga);
}
