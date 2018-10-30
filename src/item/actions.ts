import { createAction } from "typesafe-actions";
import { ItemHistory, ItemState } from "./reducers";
import { AdaptedInfo } from "./thunks";

export const getItemAction = createAction('ITEM_GET', resolve => {
  return (histories: ItemHistory[]) => resolve({ histories } as ItemState);
});

export const getInfoAction = createAction('INFO_GET', resolve => {
  return ({ iconUrl, name }: AdaptedInfo) => resolve({ iconUrl, name } as ItemState);
});
