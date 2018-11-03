import { format } from 'date-fns';
import { Abortable, requestGet } from "../../lib/http/request";
import { getItemInfoUrl } from "../../lib/xivdb/get-url";
import { getListUrlMock } from "../../lib/xivmb/get-url";
import { Dispatch, fetchItemsActionCreator, Item } from "./items";

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

const adapt = (id: number, itemList: ItemResponse[], itemInfo: InfoResponse): Item => {
  const item = itemList.find(v => v.itemId === id);
  
  if (!item) {
    return {
      id: 0,
      lowestPrice: 0,
      iconUrl: '',
      name: '',
      lastUpdated: '',
    };
  }
  
  return {
    id: item.itemId,
    lowestPrice: item.lowestPrice,
    iconUrl: itemInfo.icon,
    name: itemInfo.name_ja,
    lastUpdated: format(item.lastUpdated, dateFormat),
  } as Item;
};

const fetchInfo = (id: number, cb: (res: InfoResponse) => void): Abortable => {
  const infoUrl = getItemInfoUrl(id);
  return requestGet<InfoResponse>(infoUrl, {}, {
    whenSucceeded(res: InfoResponse) {
      cb(res);
    },
    whenFailed() {},
  })
};

export const fetchItems = (dispatch: Dispatch): () => void => {
  const listUrl = getListUrlMock();
  const disposer = [] as Abortable[];
  const abortFetchList = requestGet<ItemResponse[]>(listUrl, {}, {
    whenSucceeded(itemList: ItemResponse[]) {
      const ids = itemList.map(v => v.itemId).slice(0, 5)
      ids.forEach(id => {
        disposer.push(
          fetchInfo(id, itemInfo => {
            const adapted = adapt(id, itemList, itemInfo);
            dispatch(fetchItemsActionCreator(adapted));
          })
        );
      })
    },
    whenFailed() {},
  });
  
  disposer.push(abortFetchList);
  
  return () => {
    disposer.forEach(abortable => {
      if (!!abortable) {
        abortable.abort();
      }
    });
  };
};
