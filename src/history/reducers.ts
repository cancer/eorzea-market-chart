import { getType } from 'typesafe-actions';
import { getHistoryAction, GetHistoryAction } from './actions';

export interface HistoryState {
  result: any;
}

const initialState = {
  result: '',
};

export const getHistory = (state: HistoryState = initialState, action: GetHistoryAction) => {
  switch (action.type) {
    case getType(getHistoryAction):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
