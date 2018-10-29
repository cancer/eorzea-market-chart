import { ConnectedRouter } from "connected-react-router";
import { History } from 'history';
import * as React from 'react';
import { Route, Switch } from "react-router";
import { pure } from 'recompose';
import './App.css';
import ItemContainer from "./history/ItemContainer";

interface Props {
  history: History;
}

export default pure(function App({ history }: Props) {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Switch>
          <Route path="/" render={ () => (<div>root</div>) }/>
          <Route path="/a" component={ItemContainer} />
          <Route render={ () => (<div>Not Found</div>) } />
        </Switch>
      </div>
    </ConnectedRouter>
  );
});
