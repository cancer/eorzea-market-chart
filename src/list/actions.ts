import { createAction } from "typesafe-actions";
import { ListState } from "./reducers";

export const getList = createAction('LIST_GET', resolve => {
  return (list: ListState[]) => resolve(list);
});
