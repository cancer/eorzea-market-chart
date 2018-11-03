import * as React from 'react';
import { useContext, useEffect, useReducer, useState } from 'react';
import { fetchItems } from "../../domains/items/fetch-items";
import { ItemsContext, itemsReducer } from "../../domains/items/items";
import { HistoryContext } from '../../history';
import Item from './Item';
import './ItemsScreen.css';

const ItemsScreen = () => {
  const history = useContext(HistoryContext);
  const itemsContext = useContext(ItemsContext);
  const [state, dispatch] = useReducer(itemsReducer, itemsContext.state);
  const [listing, doneListing] = useState(false);

  useEffect(() => {
    const dispose = fetchItems(dispatch);
    doneListing(true);
    return () => dispose();
  }, [listing]);

  const handleClick = (id: number) => {
    history.push(`/items/${id}`);
  };

  return (
    <ItemsContext.Provider value={{ state, dispatch }}>
      <ul className="Items">
        <li className="ItemTableHead">
          <div className="Name">アイテム名</div>
          <div className="Price">最安値</div>
          <div className="Date">最終更新日</div>
        </li>
      </ul>
      {state.items.map(item => (
        <Item key={item.id} item={item} onClickItem={id => handleClick(id)} />
      ))}
    </ItemsContext.Provider>
  );
};

export default ItemsScreen;
