import { Dispatch } from "redux";
import { httpGet } from "../lib/http/http-get";
import { makeUrlMock } from "../lib/xivmb/get-url";
import { makeQueryParams } from "../lib/xivmb/make-query-params";
import { GetHistoryAction, getHistoryAction } from "./actions";
import { HistoryState } from "./reducers";

export enum ItemCategory {
  All,
}

export interface HistoryRequest {
  serverName: string;
  keyword: string;
  category: ItemCategory;
}

interface HistoryResponse {
  price: string;
  quontity: number;
  total: string;
  date: string;
}

const adapt = (res: HistoryResponse): HistoryState => {
  return {
    result: '',
  };
};

export const fetchHistory = (model: HistoryRequest) => {
  const url = makeUrlMock(model.serverName);
  const category = model.category === 0 ? '' : String(model.category)
  const params = makeQueryParams(category, model.keyword);
  
  return (dispatch: Dispatch<GetHistoryAction>) => {
    httpGet<HistoryResponse[]>(url, params)
      .then(result => result.map(v => adapt(v)))
      .then(values => {
        dispatch(getHistoryAction(values));
      })
  };
};