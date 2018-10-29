import { ActionType, createAction } from "typesafe-actions";
import { HistoryState } from "./reducers";

export const getHistoryAction = createAction('HISTORY_GET', resolve => {
  return (result: string) => resolve({ result } as HistoryState);
});

export type GetHistoryAction = ActionType<typeof getHistoryAction>;