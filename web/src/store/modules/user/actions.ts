import { ActionTypes, Login, UserData } from "./types";

export function checkIfAlreadyLogged({ email, password }: Login) {
  return {
    type: ActionTypes.checkIfAlreadyLogged,
    payload: {
      email,
      password,
    },
  };
}

export function SignIn({ user, token }: UserData) {
  return {
    type: ActionTypes.userSignIn,
    payload: {
      user,
      token,
    },
  };
}

export function SignOut() {
  return {
    type: ActionTypes.userSignOut,
    payload: {},
  };
}
