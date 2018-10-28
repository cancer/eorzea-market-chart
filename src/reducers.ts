import { combineReducers } from "redux";
import { login } from "./login/reducers";
import { LoginState } from "./login/reducers";

export interface State {
  login: LoginState;
}

export default combineReducers<State>({
  login,
});
