import { all } from "redux-saga/effects";

import userSaga from "./user/sagas";

export default function* rootSaga() {
  // @ts-ignore
  return yield all([userSaga]);
}
