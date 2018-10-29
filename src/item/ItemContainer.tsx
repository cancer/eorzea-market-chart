import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { hideItem } from "../list/thunks";
import { RootState } from '../reducers';
import Chart from './ChartComponent';
import './ItemContainer.css'
import { ItemHistory } from "./reducers";
import { fetchItem, ItemCategory, ItemRequest } from "./thunks";

interface StateProps {
  histories: ItemHistory[];
}

interface DispatchProps {
  fetchItem: (model: ItemRequest) => void;
  hideItem: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => {
  return {
    histories: state.getItem.histories,
  } as StateProps;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    fetchItem,
    hideItem,
  }, dispatch);

const itemLifecycle = lifecycle<Props, {}>({
  componentDidMount() {
    const model = {
      serverName: 'Tonberry',
      category: ItemCategory.All,
      keyword: '',
    };
    this.props.fetchItem(model);
  }
});

const ItemContainer = function Item(props: Props) {
  return (
    <div className="Item">
      <Chart data={props.histories} />
      <button className="Close" onClick={() => props.hideItem()}>x close</button>
    </div>
  );
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose<Props, {}>(
  connector,
  itemLifecycle,
  pure,
)(ItemContainer);
