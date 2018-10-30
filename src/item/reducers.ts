import { ActionType, getType } from 'typesafe-actions';
import * as itemActions from './actions';

export type ItemActionTypes = ActionType<typeof itemActions>;

export interface ItemHistory {
  date: number;
  lower?: number;
  average?: number;
  label: string;
}

export interface ItemState {
  name: string;
  iconUrl: string;
  histories: ItemHistory[]
}

const initialState = {
  name: '',
  iconUrl: '',
  histories: [{
    date: Date.now(),
    lower: 0,
    average: 0,
    label: '',
  }],
};

export const itemStore = (state: ItemState = initialState, action: ItemActionTypes) => {
  switch (action.type) {
    case getType(itemActions.getItemAction):
      return {
        ...state,
        ...action.payload,
      };
    case getType(itemActions.getInfoAction):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
