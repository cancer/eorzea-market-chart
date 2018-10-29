import { getType } from 'typesafe-actions';
import { getItemAction, GetItemAction } from './actions';

export interface ItemHistory {
  date: number;
  lower?: number;
  average?: number;
  label: string;
}

export interface ItemState {
  histories: ItemHistory[]
}

const initialState = {
  histories: [{
    date: Date.now(),
    lower: 0,
    average: 0,
    label: '',
  }],
};

export const getItem = (state: ItemState = initialState, action: GetItemAction) => {
  switch (action.type) {
    case getType(getItemAction):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
