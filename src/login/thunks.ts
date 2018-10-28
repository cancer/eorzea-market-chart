import { Dispatch } from "redux";
import { loginByFirebase } from "../lib/login-by-firebase";
import { loginAction, LoginAction } from "./actions";

export const login = () => {
  return (dispatch: Dispatch<LoginAction>) => {
    loginByFirebase()
      .then(isLoggedIn => {
        dispatch(loginAction(isLoggedIn));
      });
  }
}