import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { hideItem } from '../list/thunks';
import { RootState } from '../reducers';
import Chart from './ChartComponent';
import './ItemContainer.css';
import { ItemHistory } from './reducers';
import { fetchItemHistory, fetchItemInfo } from './thunks';

interface StateProps {
  histories: ItemHistory[];
  id: number;
  name: string;
  iconUrl: string;
}

interface DispatchProps {
  fetchItemHistory: (id: number) => void;
  fetchItemInfo: (id: number) => void;
  hideItem: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => {
  return {
    histories: state.itemStore.histories,
    id: state.listStore.displayId,
    name: state.itemStore.name,
    iconUrl: state.itemStore.iconUrl,
  } as StateProps;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchItemHistory,
      fetchItemInfo,
      hideItem,
    },
    dispatch,
  );

const itemLifecycle = lifecycle<Props, {}>({
  componentDidMount() {
    this.props.fetchItemHistory(this.props.id);
    this.props.fetchItemInfo(this.props.id);
  },
});

const ItemContainer = function Item(props: Props) {
  const latest = props.histories[props.histories.length - 1];
  return (
    <div className="Item">
      <div className="ItemInner">
        <h2 className="Name">{props.name}</h2>
        <img className="Icon" src={props.iconUrl} />
        <div className="PriceData">
          <div className="Lowest">
            前日最安値:
            {latest.lower ? (
              <>
                <span className="Unit">Gil</span>
                <span className="Price">{latest.lower}</span>
              </>
            ) : (
              <span className="NoData">No Data</span>
            )}
          </div>
          <div className="Average">
            前日平均額:
            {latest.average ? (
              <>
                <span className="Unit">Gil</span>
                <span className="Price">{latest.average}</span>
              </>
            ) : (
              <span className="NoData">No Data</span>
            )}
          </div>
        </div>
        <div className="Chart">
          <Chart data={props.histories} />
        </div>
        <div className="Footer">
          <button className="Close" onClick={() => props.hideItem()}>
            close
          </button>
        </div>
      </div>
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
