import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyCPzDtY2ZKHOsIBUzhVR_QujkY21dPGEcg",
  authDomain: "eorzea-market-chart.firebaseapp.com",
  databaseURL: "https://eorzea-market-chart.firebaseio.com",
  projectId: "eorzea-market-chart",
  storageBucket: "eorzea-market-chart.appspot.com",
  messagingSenderId: "979898095501"
};

export const firebaseApp = firebase.initializeApp(config);

