import { addDays, format, isWithinRange, startOfToday, subDays } from 'date-fns';
import { Dispatch } from 'redux';
import { httpGet } from '../lib/http/http-get';
import { getItemInfoUrl } from "../lib/xivdb/get-url";
import { getItemUrlMock } from '../lib/xivmb/get-url';
import { makeQueryParams } from '../lib/xivmb/make-query-params';
import { InfoResponse } from "../list/thunks";
import { getInfoAction, getItemAction } from './actions';
import { ItemActionTypes, ItemHistory } from './reducers';

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

const makePoint = (date_: Date, prices: number[]): ItemHistory => {
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

const adaptItemHistory = (res: ItemResponse[]): ItemHistory[] => {
  const dates = makeDates(30);

  const histories = dates.map(date => {
    const prices = res
      .filter(v => {
        return isWithinRange(v.date, date, addDays(date, 1));
      })
      .map(v => parseInt(v.price.replace(',', ''), 10));

    return makePoint(date, prices);
  });

  return histories;
};

export const fetchItemHistory = (model: ItemRequest) => {
  const url = getItemUrlMock(model.serverName);
  const category = model.category === 0 ? '' : String(model.category);
  const params = makeQueryParams(category, model.keyword);

  return (dispatch: Dispatch<ItemActionTypes>) => {
    httpGet<ItemResponse[]>(url, params)
      .then(result => adaptItemHistory(result))
      .then(value => {
        dispatch(getItemAction(value));
      });
  };
};

export interface AdaptedInfo {
  iconUrl: string;
  name: string;
}

const adaptInfo = (res: InfoResponse): AdaptedInfo => {
  return {
    name: res.name_ja,
    iconUrl: res.icon,
  };
};

export const fetchItemInfo = (id: number) => {
  const url = getItemInfoUrl(id);
  
  return (dispatch: Dispatch<ItemActionTypes>) => {
    httpGet<InfoResponse>(url)
      .then(result => adaptInfo(result))
      .then(value => {
        dispatch(getInfoAction(value));
      });
  };
};

