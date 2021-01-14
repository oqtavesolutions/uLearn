import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import { getAuthorEdit, updateAuthor, updateAuthorImage } from "./middlewares";
import { toast } from "react-toastify";

function* getAuthorEditSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(getAuthorEdit, action.payload);
    yield put({
      type: types.GET_AUTHOR_EDIT_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_AUTHOR_EDIT_FAILURE,
    });
  }
}

function* updateAuthorSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(updateAuthor, action.payload);
    yield put({
      type: types.UPDATE_AUTHOR_SUCCESSFUL,
      payload,
    });
    yield call(toast.dark, "Successfully updated page details!");
  } catch (error) {
    yield put({
      type: types.UPDATE_AUTHOR_FAILURE,
      payload: error,
    });
    yield call(toast.error, "Update failed! Please try again!");
  }
}

function* updateAuthorImageSaga(action) {
  console.log("saga");
  try {
    const payload = yield call(updateAuthorImage, action.payload);

    yield put({
      type: types.UPDATE_AUTHOR_IMAGE_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.UPDATE_AUTHOR_IMAGE_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetAuthorEditSaga() {
  yield takeLatest(types.GET_AUTHOR_EDIT, getAuthorEditSaga);
}

export function* watchUpdateAuthorSaga() {
  yield takeLatest(types.UPDATE_AUTHOR, updateAuthorSaga);
}
export function* watchUpdateAuthorImageSaga() {
  yield takeLatest(types.UPDATE_AUTHOR_IMAGE, updateAuthorImageSaga);
}
