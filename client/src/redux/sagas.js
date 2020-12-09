import { fork } from "redux-saga/effects";
import watchUserLogin from "../pages/Login/redux/sagas";
import watchUserSignup from "../pages/Signup/redux/sagas";

export default function* rootSaga() {
  yield fork(watchUserSignup);
  yield fork(watchUserLogin);
}
