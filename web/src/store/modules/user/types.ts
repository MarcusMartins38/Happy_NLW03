export enum ActionTypes {
  checkIfAlreadyLogged = "USER_CHECK_SIGN_IN",
  justCheckStorage = "CHECK_USER_STORAGE",
  userSignIn = "USER_SIGN_IN",
  userSignOut = "USER_SIGN_OUT",
}

export interface Login {
  email: string;
  password: string;
}

export interface UserProps {
  id: string;
  name: string;
  email: string;
}

export interface UserData {
  user: UserProps | object;
  token: string;
}
