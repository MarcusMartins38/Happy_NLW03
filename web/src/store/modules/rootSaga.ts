import { all } from "redux-saga/effects";

import userSaga from "./user/sagas";

export default function* rootSaga() {
  return yield all([userSaga]);
}
