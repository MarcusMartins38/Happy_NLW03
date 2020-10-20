import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./modules/rootReducer";
import rootSaga from "./modules/rootSaga";
import { UserData } from "./modules/user/types";

export interface IState {
  userReducer: UserData;
}

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;
