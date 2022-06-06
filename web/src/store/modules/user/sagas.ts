import { all, takeLatest, select, call, put } from "redux-saga/effects";
import api from "../../../services/api";
import { checkIfAlreadyLogged, SignIn } from "./actions";
import { ActionTypes, Login, UserData } from "./types";

type ifAlreadyLogged = ReturnType<typeof checkIfAlreadyLogged>;

function* checkIfUserAlreadyLogged({ payload }: ifAlreadyLogged) {
  const { email, password } = payload;

  const token = localStorage.getItem("@Happy:token");
  const user = localStorage.getItem("@Happy:user");

  if (token && user) {
    api.defaults.headers.authorization = `Bearer ${token}`;

    yield put(SignIn({ user: JSON.parse(user), token }));
  } else {
    try {
      // @ts-ignore
      const response = yield call(api.post, "/sessions", { email, password });
      const { user, token } = response.data;

      localStorage.setItem("@Happy:token", token);
      localStorage.setItem("@Happy:user", JSON.stringify(user));

      api.defaults.headers.authorization = `Bearer ${token}`;

      yield put(SignIn({ user, token }));
    } catch (err) {
      alert("Falha ao Logar");
    }
  }
}

export default all([
  takeLatest(ActionTypes.checkIfAlreadyLogged, checkIfUserAlreadyLogged),
]);
