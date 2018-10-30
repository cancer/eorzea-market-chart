import { format } from "date-fns";
import { Dispatch } from "redux";
import { httpGet } from "../lib/http/http-get";
import { getItemInfoUrl } from "../lib/xivdb/get-url";
import { getListUrlMock } from "../lib/xivmb/get-url";
import { displayItemAction, getFavAction, getListAction, hideItemAction } from "./actions";
import { ListActionTypes, ListItem } from "./reducers";

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

export interface InfoResponse {
  id: number;
  icon: string;
  name_ja: string;
}

const dateFormat = 'YYYY/MM/DD hh:mm:ss';

const adapt = (itemList: ItemResponse[], infoList: InfoResponse[]): ListItem[] => {
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
  }, [] as ListItem[]);
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
        dispatch(getListAction(list));
      });
  };
};

export const displayItem = (id: number) => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(displayItemAction(id));
  };
};

export const hideItem = () => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(hideItemAction());
  };
};

const getStoredFavs = (): number[] => {
  return JSON.parse(localStorage.getItem('favs') || '[]');
};

export const getFavs = () => {
  return (dispatch: Dispatch<ListActionTypes>) => {
    dispatch(getFavAction(getStoredFavs()));
  };
}

export const addFav = (id: number) => {
  const favs = getStoredFavs();
  
  if (favs.includes(id)) {
    return () => {};
  }
  
  localStorage.setItem('favs', JSON.stringify(favs.concat(id)));
  return () => {};
};