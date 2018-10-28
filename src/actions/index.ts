import { Action } from "redux";

type ActionTypes = 'LOGIN'

export interface LoginAction extends Action {
  type: ActionTypes,
}

export const login = (): LoginAction => ({
  type: 'LOGIN',
});
