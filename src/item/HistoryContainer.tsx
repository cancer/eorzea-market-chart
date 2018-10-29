import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../reducers';
import Chart from './ChartComponent';
import { Point } from "./reducers";
import { fetchHistory, HistoryRequest, ItemCategory } from "./thunks";

interface StateProps {
  chart: Point[];
}

interface DispatchProps {
  fetchHistory: (model: HistoryRequest) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => {
  return {
    chart: state.getHistory.chart,
  } as StateProps;
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({
    fetchHistory,
  }, dispatch);

const historyLifecycle = lifecycle<Props, {}>({
  componentDidMount() {
    const model = {
      serverName: 'Tonberry',
      category: ItemCategory.All,
      keyword: '',
    };
    this.props.fetchHistory(model);
  }
});

const HistoryContainer = function History(props: Props) {
  return <Chart data={props.chart} />;
};

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose<Props, {}>(
  connector,
  historyLifecycle,
  pure,
)(HistoryContainer);
