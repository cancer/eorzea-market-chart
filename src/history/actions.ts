import { ActionType, createAction } from "typesafe-actions";
import { HistoryState } from "./reducers";

export const getHistoryAction = createAction('HISTORY_GET', resolve => {
  return (values: HistoryState[]) => resolve(values);
});

export type GetHistoryAction = ActionType<typeof getHistoryAction>;