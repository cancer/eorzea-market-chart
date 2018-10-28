import * as firebase from 'firebase';
import { Dispatch } from "redux";
import { ActionType, createAction } from "typesafe-actions";
import { firebaseApp } from "../lib/firebase";
import { LoginState } from "../reducers/login/index";

const loginByFirebase = (): Promise<boolean> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  return firebaseApp.auth().signInWithPopup(provider)
    .then(result => {
      if (!result || !result.credential || !result.credential.providerId) {
        return false;
      }
  
      return true;
    });
};

export const loginAction = createAction('LOGGED_IN', resolve => {
  return (isLoggedIn: boolean) => resolve({ isLoggedIn } as LoginState);
});

export type LoginAction = ActionType<typeof loginAction>

export const login = () => {
  return (dispatch: Dispatch<LoginAction>) => {
    loginByFirebase()
      .then(isLoggedIn => {
        dispatch(loginAction(isLoggedIn));
      });
  }
}
