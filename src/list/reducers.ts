import { ActionType, getType } from 'typesafe-actions';
import * as listActions from './actions';

export type ListActionTypes = ActionType<typeof listActions>

export interface ListItem {
  id: number;
  lowestPrice: number;
  iconUrl: string;
  name: string;
  lastUpdated: string;
}

export interface ListState {
  list: ListItem[];
  displayId: number;
  isDisplayItem: boolean;
  favs: number[];
}

const initialState = {
  list: [
    {
      id: 0,
      lowestPrice: 0,
      iconUrl: '',
      name: '',
      lastUpdated: '',
    },
  ],
  displayId: 0,
  isDisplayItem: false,
  favs: [],
};

export const listStore = (state: ListState = initialState, action: ListActionTypes) => {
  switch (action.type) {
    case getType(listActions.getListAction):
      return {
        ...state,
        ...action.payload,
      };
    case getType(listActions.displayItemAction):
      return {
        ...state,
        ...action.payload,
        isDisplayItem: true,
      };
    case getType(listActions.hideItemAction):
      return {
        ...state,
        displayId: 0,
        isDisplayItem: false,
      };
    case getType(listActions.getFavAction):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
