import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { changePassword } from "./middlewares";
import { toast } from "react-toastify";

function* changePasswordSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(changePassword, action.payload);
    yield put({
      type: types.CHANGE_PASSWORD_SUCCESSFUL,
      payload,
    });
    yield call(toast.dark, "Password successfully updated!");
  } catch (error) {
    yield put({
      type: types.CHANGE_PASSWORD_FAILURE,
      payload: error,
    });
    yield call(toast.error, "Update failed! Invalid password.");
  }
}

export function* watchChangePasswordSaga() {
  yield takeLatest(types.CHANGE_PASSWORD, changePasswordSaga);
}
