import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../reducers';
import Chart from './ChartComponent';
import { PriceHistory } from "./reducers";
import { fetchItem, ItemCategory, ItemRequest } from "./thunks";

interface StateProps {
  history: PriceHistory[];
}

interface DispatchProps {
  fetchItem: (model: ItemRequest) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => {
  return {
    history: state.getItem.histories,
  } as StateProps;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    fetchItem,
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
  return <Chart data={props.history} />;
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
