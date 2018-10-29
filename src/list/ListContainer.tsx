import * as React from 'react';
import { connect } from 'react-redux';
import { compose, lifecycle, pure } from 'recompose';
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../reducers";
import './ListContainer.css';
import { displayItem, fetchList } from "./thunks";

interface ListItem {
  id: number;
  lowestPrice: number;
  iconUrl: string;
  name: string;
  lastUpdated: string;
}

interface StateProps {
  list: ListItem[];
}

interface DispatchProps {
  fetchList: () => void;
  displayItem: (id: number) => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState) => ({
  list: state.listStore.list,
} as StateProps);

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchList,
  displayItem,
}, dispatch);

const getListItem = ({ id, name, iconUrl, lowestPrice, lastUpdated }: ListItem, displayItem: (id: number) => void) => {
  return (
    <li className="ListItem">
      <a href="" onClick={(e) => {
        e.preventDefault();
        displayItem(id)
      }}>
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

const ListContainer = function List({ list, displayItem }: Props) {
  return (
    <ul className="List">
      <li className="ListItemHeader">
        <div className="Name">アイテム名</div>
        <div className="Price">最安値</div>
        <div className="Date">最終更新日</div>
      </li>
      { list.map(item => getListItem(item, displayItem)) }
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
