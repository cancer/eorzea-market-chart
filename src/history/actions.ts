import { ActionType, createAction } from 'typesafe-actions';
import { ItemState } from './reducers';

export const getItemAction = createAction('ITEM_GET', resolve => {
  return (value: ItemState) => resolve(value);
});

export type GetItemAction = ActionType<typeof getItemAction>;
