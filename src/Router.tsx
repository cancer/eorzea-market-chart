import * as React from 'react';
import { Routes } from "universal-router";
import App from "./App";
import { HistoryContext } from "./history";
import ItemsScreen from './screens/items/ItemsScreen';

function Items({ id }: { id: string }) {
  const history = React.useContext(HistoryContext)
  const handleClick = () => {
    history.push('/')
  }
  
  return (
    <>
      <div>{id}</div>
      <a href="" onClick={ (e) => {
        e.preventDefault()
        handleClick()
      } }>To /</a>
    </>
  )
}

export const routes = [
  {
    path: '/',
    action: async ({ next }) => {
      const component = await next();
      return <App component={component} />
    },
    children: [
      {
        path: '/',
        action: () => <ItemsScreen/>,
      },
      {
        path: '/items/:id',
        action: context => <Items id={context.params.id}/>,
      },
    ]
  },
] as Routes
