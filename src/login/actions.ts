import { ActionType, createAction } from "typesafe-actions";
import { LoginState } from "./reducers";

export const loginAction = createAction('LOGGED_IN', resolve => {
  return (isLoggedIn: boolean) => resolve({ isLoggedIn } as LoginState);
});

export type LoginAction = ActionType<typeof loginAction>
