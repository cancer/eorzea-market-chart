import * as React from 'react';
import { pure } from 'recompose';
import './App.css';
import Item from './item/ItemContainer';
import List from './list/ListContainer';

export default pure(function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Eorzea Market Charts</h1>
      </header>
      <List />
      <Item />
    </div>
  );
});
