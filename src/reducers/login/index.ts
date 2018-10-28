import { getType } from "typesafe-actions";
import { loginAction, LoginAction } from "../../actions/index";

export interface LoginState {
  isLoggedIn: boolean;
}

const initialState = {
  isLoggedIn: false,
};

export const login = (state: LoginState = initialState, action: LoginAction) => {
  switch(action.type) {
    case getType(loginAction):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
