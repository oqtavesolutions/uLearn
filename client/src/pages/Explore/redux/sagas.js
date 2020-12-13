import { call, put, takeLatest } from "redux-saga/effects";
import * as types from "./constants";
import {
  getExplorePageCourses,
  getExplorePageCoursesByCategory,
} from "./middlewares";

function* getExplorePageCoursesSaga(action) {
  try {
    const payload = yield call(getExplorePageCourses, action.payload);
    yield put({
      type: types.GET_EXPLORE_PAGE_COURSES_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_EXPLORE_PAGE_COURSES_FAILURE,
    });
  }
}

function* getExplorePageCoursesByCategorySaga(action) {
  try {
    const payload = yield call(getExplorePageCoursesByCategory, action.payload);
    yield put({
      type: types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY_SUCCESSFUL,
      payload,
    });
  } catch (error) {
    yield put({
      type: types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY_FAILURE,
    });
  }
}

export function* watchGetExplorePageCoursesSaga() {
  yield takeLatest(types.GET_EXPLORE_PAGE_COURSES, getExplorePageCoursesSaga);
}

export function* watchGetExplorePageCoursesByCategorySaga() {
  yield takeLatest(
    types.GET_EXPLORE_PAGE_COURSES_BY_CATEGORY,
    getExplorePageCoursesByCategorySaga
  );
}
