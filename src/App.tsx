import * as React from 'react';
import { pure } from 'recompose';
import './App.css';
import History from './history/HistoryContainer';
import Login from './login/LoginContainer';

export default pure(function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Login />
      </header>
      <History />
    </div>
  );
});
