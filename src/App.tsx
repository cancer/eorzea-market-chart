import * as React from 'react';
import { connect } from "react-redux";
import { pure } from 'recompose';
import { bindActionCreators, Dispatch } from "redux";
import './App.css';
import Item from './item/ItemContainer';
import List from './list/ListContainer';
import { RootState } from "./reducers";

interface StateProps {
  isDisplayItem: boolean;
}

interface DispatchProps {
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({
  isDisplayItem: state.listStore.isDisplayItem,
} as StateProps);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({}, dispatch);

const App = pure(function App({ isDisplayItem }: Props) {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Eorzea Market Charts</h1>
      </header>
      <List />
      { isDisplayItem ? <Item /> : null }
    </div>
  );
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
