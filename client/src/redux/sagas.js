import { fork } from "redux-saga/effects";
import watchUserSignup from "../pages/Signup/redux/sagas";

export default function* rootSaga() {
  yield fork(watchUserSignup);
}
