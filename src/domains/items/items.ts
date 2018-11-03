import { createContext } from "react";

export type Dispatch = (...args: any) => void;

interface ItemsAction {
  type: string;
  payload: ItemsState;
}

export interface Item {
  id: number;
  lowestPrice: number;
  iconUrl: string;
  name: string;
  lastUpdated: string;
}

interface ItemContextValue {
  state: ItemsState;
  dispatch: Dispatch;
}

export interface ItemsState {
  items: Item[];
}

const initialState = {
  items: [],
};

export const ItemsContext = createContext({ state: initialState, dispatch: () => {}, } as ItemContextValue);

export const itemsReducer = (state: ItemsState, action: ItemsAction) => {
  switch (action.type) {
    case 'fetch':
      if (state.items.some(v => action.payload.items.some(vv => vv.id === v.id))) {
        const items = state.items.map(item => {
          const found = action.payload.items.find(v => v.id === item.id);
          return found ? found : item;
        });
        return {
          ...state,
          ...action.payload,
          items,
        };
      }
      
      return {
        ...state,
        ...action.payload,
        items: state.items.concat(action.payload.items),
      };
    default:
      return state;
  }
};

export const fetchItemsActionCreator = (value: Item): ItemsAction => {
  return {
    type: 'fetch',
    payload: {
      items: [value],
    },
  };
};

