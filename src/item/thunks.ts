import { addDays, format, isWithinRange, startOfToday, subDays } from 'date-fns';
import { Dispatch } from 'redux';
import { httpGet } from '../lib/http/http-get';
import { getItemInfoUrl } from '../lib/xivdb/get-url';
import { getItemUrlMock } from '../lib/xivmb/get-url';
import { InfoResponse } from '../list/thunks';
import { getInfoAction, getItemAction } from './actions';
import { ItemActionTypes, ItemHistory } from './reducers';

interface ItemResponse {
  price: number;
  quantity: number;
  total: number;
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

const makeDate = (date_: Date): { date: number; label: string } => {
  const date = date_.getTime();
  return {
    date,
    label: format(date, dateFormat),
  };
};

const makeAverage = (history: ItemResponse[]): number => {
  const totalPrice = history.reduce((a, v) => a + v.price * v.quantity, 0);
  const totalCount = history.reduce((a, v) => a + v.quantity, 0);

  return Math.round(totalPrice / totalCount);
};

const adaptItemHistory = (res: ItemResponse[]): ItemHistory[] => {
  const dates = makeDates(30);

  const histories = dates.map(date => {
    const history = res.filter(v => {
      return isWithinRange(v.date, date, addDays(date, 1));
    });
    const prices = history.map(v => v.price);
    const average = makeAverage(history);

    return {
      ...makeDate(date),
      lower: prices.length > 0 ? Math.min(...prices) : undefined,
      average,
    };
  });

  return histories;
};

export const fetchItemHistory = (id: number) => {
  const url = getItemUrlMock(id);

  return (dispatch: Dispatch<ItemActionTypes>) => {
    httpGet<ItemResponse[]>(url)
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
