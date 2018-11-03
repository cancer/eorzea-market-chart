import * as React from 'react';
import { Item } from "../../domains/items/items";

interface Props {
  item: Item;
  onClickItem: (id: number) => void;
}

const Item = ({ item, onClickItem }: Props) => {
  const { id, name, iconUrl, lowestPrice, lastUpdated } = item;
  return (
    <li key={id} className="Item">
      <a
        href=""
        onClick={e => {
          e.preventDefault();
          onClickItem(id);
        }}
      >
        <div className="Name">{name}</div>
        <img className="Icon" src={iconUrl} alt={name} />
        <div className="Price">
          {lowestPrice ? (
            <span>
              <span className="Unit">Gil</span>
              {lowestPrice}
            </span>
          ) : (
            <span className="NoData">-</span>
          )}
        </div>
        <div className="Date">{lastUpdated ? lastUpdated : <span className="NoData">-</span>}</div>
      </a>
    </li>
  );
};

export default Item;
