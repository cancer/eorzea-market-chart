import { format } from "date-fns";
import { Dispatch } from "redux";
import { httpGet } from "../lib/http/http-get";
import { getItemInfoUrl } from "../lib/xivdb/get-url";
import { getListUrlMock } from "../lib/xivmb/get-url";
import { getList } from "./actions";
import { ListActionTypes, ListState } from "./reducers";

interface ItemResponse {
  itemId: number;
  name: string;
  lowestPrice: number;
  quantity: number;
  lowestHq: number;
  lowestNq: number;
  averagePrice: number;
  lastSale: number;
  totalPrice: number;
  totalCount: number;
  lastUpdated: string;
}

interface InfoResponse {
  id: number;
  icon: string;
  name_ja: string;
}

const dateFormat = 'YYYY/MM/DD hh:mm:ss';

const adapt = (itemList: ItemResponse[], infoList: InfoResponse[]): ListState[] => {
  return itemList.reduce((acc, item) => {
    const info = infoList.find(info => info.id === item.itemId);
    
    if (!info) {
      return acc;
    }
    
    return acc.concat({
      id: item.itemId,
      lowestPrice: item.lowestPrice,
      name: info.name_ja,
      iconUrl: info.icon,
      lastUpdated: format(item.lastUpdated, dateFormat),
    });
  }, [] as ListState[]);
};

const fetchInfo = (ids: number[]): Promise<InfoResponse[]> => {
  return Promise.all(
    ids.map(id => {
      const itemUrl = getItemInfoUrl(id);
      return httpGet<InfoResponse>(itemUrl);
    }),
  );
};

export const fetchList = () => {
  const url = getListUrlMock();
  
  return (dispatch: Dispatch<ListActionTypes>) => {
    httpGet<ItemResponse[]>(url)
      .then(async itemResult => {
        const ids = itemResult.map(v => v.itemId);
        const infoResult = await fetchInfo(ids);
        return Promise.resolve({itemResult, infoResult});
      })
      .then(({itemResult, infoResult}) => adapt(itemResult, infoResult))
      .then(list => {
        dispatch(getList(list));
      });
  };
}