import * as React from 'react';
import { connect } from 'react-redux';
import { pure } from 'recompose';
import { Dispatch } from 'redux';
import { login, LoginAction } from './actions';
import './App.css';

interface StateProps {
  foo: string;
}

interface DispatchProps {
  login: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: { foo: string } = { foo: 'foo' }): StateProps => {
  const { foo } = state;
  return {
    foo,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<LoginAction>) => {
  return {
    login: () => dispatch(login()),
  };
};

const App = pure(function App({ login }: Props) {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={login}>Login</button>
      </header>
    </div>
  );
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
