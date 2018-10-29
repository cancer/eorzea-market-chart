import * as React from 'react';
import { pure } from 'recompose';
import './App.css';
import History from './item/HistoryContainer';

export default pure(function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Eorzea Market Charts</h1>
      </header>
      <History />
    </div>
  );
});
