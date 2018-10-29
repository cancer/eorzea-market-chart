import { Dispatch } from "redux";
import { httpGet } from "../lib/http/http-get";
import { makeUrlMock } from "../lib/xivmb/get-url";
import { makeQueryParams } from "../lib/xivmb/make-query-params";
import { GetHistoryAction, getHistoryAction } from "./actions";

export enum ItemCategory {
  All,
}

export interface HistoryRequest {
  serverName: string;
  keyword: string;
  category: ItemCategory;
}

export const fetchHistory = (model: HistoryRequest) => {
  const url = makeUrlMock(model.serverName);
  const category = model.category === 0 ? '' : String(model.category)
  const params = makeQueryParams(category, model.keyword);
  
  return (dispatch: Dispatch<GetHistoryAction>) => {
    httpGet(url, params)
      .then(result => {
        dispatch(getHistoryAction(result));
      })
  };
};