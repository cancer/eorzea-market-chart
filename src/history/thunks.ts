import { addDays, format, isWithinRange, startOfToday, subDays } from 'date-fns';
import { Dispatch } from 'redux';
import { httpGet } from '../lib/http/http-get';
import { makeUrlMock } from '../lib/xivmb/get-url';
import { makeQueryParams } from '../lib/xivmb/make-query-params';
import { GetItemAction, getItemAction } from './actions';
import { ItemState, PriceHistory } from './reducers';

export enum ItemCategory {
  All,
}

export interface ItemRequest {
  serverName: string;
  keyword: string;
  category: ItemCategory;
}

interface ItemResponse {
  price: string;
  quontity: number;
  total: string;
  date: string;
}

const dateFormat = 'MM/DD';

const makeDates = (days: number): Date[] => {
  return new Array(days)
    .fill(undefined)
    .map((_, i) => {
      const today = startOfToday();
      return subDays(today, i);
    })
    .reverse();
};

const makeHistory = (date_: Date, prices: number[]): PriceHistory => {
  const date = date_.getTime();

  if (prices.length < 1) {
    return {
      date,
      label: format(date, dateFormat),
    };
  }

  const lower = Math.min(...prices);
  const average = Math.round(prices.reduce((a, v) => a + v, 0) / prices.length);

  return { date, lower, average, label: format(date, dateFormat) };
};

const adapt = (res: ItemResponse[]): ItemState => {
  const dates = makeDates(20);

  const histories = dates.map(date => {
    const prices = res
      .filter(v => {
        return isWithinRange(v.date, date, addDays(date, 1));
      })
      .map(v => parseInt(v.price.replace(',', ''), 10));

    return makeHistory(date, prices);
  });

  return { histories };
};

export const fetchItem = (model: ItemRequest) => {
  const url = makeUrlMock(model.serverName);
  const category = model.category === 0 ? '' : String(model.category);
  const params = makeQueryParams(category, model.keyword);

  return (dispatch: Dispatch<GetItemAction>) => {
    httpGet<ItemResponse[]>(url, params)
      .then(result => adapt(result))
      .then(value => {
        dispatch(getItemAction(value));
      });
  };
};
