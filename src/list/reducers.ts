import { ActionType, getType } from 'typesafe-actions';
import * as listActions from './actions';

export type ListActionTypes = ActionType<typeof listActions>

export interface ListState {
  id: number;
  lowestPrice: number;
  iconUrl: string;
  name: string;
  lastUpdated: string;
}

const initialState = [
  {
    id: 0,
    lowestPrice: 0,
    iconUrl: '',
    name: '',
    lastUpdated: '',
  },
];

export const listStore = (state: ListState[] = initialState, action: ListActionTypes) => {
  switch (action.type) {
    case getType(listActions.getList):
      return action.payload;
    default:
      return state;
  }
};
