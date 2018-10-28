import { combineReducers } from "redux";
import { LoginAction } from "../actions";

interface State {}

const helloWorld = (state: State = {}, action: LoginAction) => {
  switch(action.type) {
    case 'LOGIN':
      return state;
    default:
      return state;
  }
};

export const reducers = combineReducers({
  helloWorld,
});