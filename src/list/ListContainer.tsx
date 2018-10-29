import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../reducers";
import './ListContainer.css';
import { fetchList } from "./thunks";

interface List {
  id: number;
  lowestPrice: number;
  iconUrl: string;
  name: string;
  lastUpdated: string;
}

interface StateProps {
  list: List[];
}

interface DispatchProps {
  fetchList: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({
  list: state.listStore,
} as StateProps);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchList,
}, dispatch);

const getListItem = ({ name, iconUrl, lowestPrice, lastUpdated }: List) => {
  return (
    <li className="ListItem">
      <a href="" onClick={() => console.log('click')}>
        <div className="Name">{name}</div>
        <img className="Icon" src={iconUrl} alt={name} />
        <div className="Price">
          {
            lowestPrice ?
              <span><span className="Unit">Gil</span>{ lowestPrice }</span> :
              <span className="NoData">-</span>
          }
        </div>
        <div className="Date">{ lastUpdated ? lastUpdated : <span className="NoData">-</span> }</div>
      </a>
    </li>
  )
};

const ListContainer = function List({ list }: Props) {
  return (
    <ul className="List">
      <li className="ListItemHeader">
        <div className="Name">アイテム名</div>
        <div className="Price">最安値</div>
        <div className="Date">最終更新日</div>
      </li>
      { list.map(item => getListItem(item)) }
    </ul>
  );
};

const listLifeCycle = lifecycle<Props, {}>({
  componentDidMount() {
    this.props.fetchList();
  }
});

const connector = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const enhancer = compose<Props, {}>(
  connector,
  listLifeCycle,
  pure,
);

export default enhancer(ListContainer);
