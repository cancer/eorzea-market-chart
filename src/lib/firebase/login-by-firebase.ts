import * as firebase from "firebase";
import { firebaseApp } from "./firebase";

export const loginByFirebase = (): Promise<boolean> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  
  return firebaseApp.auth().signInWithPopup(provider)
    .then(result => {
      if (!result || !result.credential || !result.credential.providerId) {
        return false;
      }
      
      return true;
    });
};