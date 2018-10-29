import { getType } from 'typesafe-actions';
import { getHistoryAction, GetHistoryAction } from './actions';

export interface Point {
  date: number;
  lower?: number;
  average?: number;
  label: string;
}

export interface HistoryState {
  chart: Point[]
}

const initialState = {
  chart: [{
    date: Date.now(),
    lower: 0,
    average: 0,
    label: '',
  }],
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
