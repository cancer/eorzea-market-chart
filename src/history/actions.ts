import { ActionType, createAction } from "typesafe-actions";
import { HistoryState } from "./reducers";

export const getHistoryAction = createAction('HISTORY_GET', resolve => {
  return (value: HistoryState) => resolve(value);
});

export type GetHistoryAction = ActionType<typeof getHistoryAction>;