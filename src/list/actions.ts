import { createAction } from "typesafe-actions";
import { ListItem, ListState } from "./reducers";

export const getListAction = createAction('LIST_GET', resolve => {
  return (list: ListItem[]) => resolve({ list } as ListState);
});

export const displayItemAction = createAction('DISPLAY_ITEM', resolve => {
  return (displayId: number) => resolve({ displayId } as ListState);
});

export const hideItemAction = createAction('HIDE_ITEM', resolve => {
  return () => resolve();
});
