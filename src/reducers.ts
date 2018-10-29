import { combineReducers } from "redux";
import { getItem, ItemState } from "./item/reducers";
import { login, LoginState } from "./login/reducers";

export interface RootState {
  login: LoginState;
  getItem: ItemState;
}

export default combineReducers<RootState>({
  login,
  getItem,
});
