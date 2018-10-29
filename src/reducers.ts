import { combineReducers } from "redux";
import { getItem, ItemState } from "./item/reducers";
import { ListState, listStore } from "./list/reducers";
import { login, LoginState } from "./login/reducers";

export interface RootState {
  login: LoginState;
  getItem: ItemState;
  listStore: ListState;
}

export default combineReducers<RootState>({
  login,
  getItem,
  listStore,
});
