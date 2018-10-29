import { combineReducers } from "redux";
import { getHistory, HistoryState } from "./item/reducers";
import { login, LoginState } from "./login/reducers";

export interface RootState {
  login: LoginState;
  getHistory: HistoryState;
}

export default combineReducers<RootState>({
  login,
  getHistory,
});
