import { Reducer } from "redux";
import api from "../../../services/api";
import { ActionTypes, UserData } from "./types";

const INITIAL_STATE: UserData = {
  user: {},
  token: "",
};

const token = localStorage.getItem("@Happy:token");
const user = localStorage.getItem("@Happy:user");

if (token && user) {
  api.defaults.headers.authorization = `Bearer ${token}`;

  INITIAL_STATE.user = JSON.parse(user);
  INITIAL_STATE.token = token;
}

const userReducer: Reducer<UserData> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.userSignIn: {
      const { user, token } = action.payload;

      return {
        ...state,
        user,
        token,
      };
    }

    case ActionTypes.userSignOut: {
      localStorage.removeItem("@Happy:token");
      localStorage.removeItem("@Happy:user");

      return INITIAL_STATE;
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
