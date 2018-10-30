import { combineReducers } from "redux";
import { ItemState, itemStore } from "./item/reducers";
import { ListState, listStore } from "./list/reducers";
import { login, LoginState } from "./login/reducers";

export interface RootState {
  login: LoginState;
  itemStore: ItemState;
  listStore: ListState;
}

export default combineReducers<RootState>({
  login,
  itemStore,
  listStore,
});
