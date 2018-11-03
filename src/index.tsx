import createBrowserHistory from "history/createBrowserHistory";
import * as React from "react";
import * as ReactDOM from 'react-dom';
import UniversalRouter from "universal-router";
import { HistoryContext } from "./history";
import './index.css';
import { routes } from "./Router";

const router = new UniversalRouter(routes);
const history = createBrowserHistory();

const whenRouterResolved = (el: JSX.Element) => {
  ReactDOM.render(
    <HistoryContext.Provider value={history}>{el}</HistoryContext.Provider>,
    document.getElementById('root'),
  );
};

history.listen(path => {
  router.resolve(path).then(whenRouterResolved)
});
router.resolve(history.location).then(whenRouterResolved);
