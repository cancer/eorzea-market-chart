import { combineReducers } from "redux";
import { login } from "../reducers/login";
import { LoginState } from "./login";

export interface State {
  login: LoginState;
}

export default combineReducers<State>({
  login,
});
