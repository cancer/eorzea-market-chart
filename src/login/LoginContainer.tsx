import * as React from 'react';
import { connect } from "react-redux";
import { pure } from "recompose";
import { bindActionCreators, Dispatch } from "redux";
import { RootState } from "../reducers";
import { login } from "./thunks";

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  login: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: RootState): StateProps => {
  const isLoggedIn = state.login.isLoggedIn;
  return {
    isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      login,
    },
    dispatch,
  );

const LoginContainer = pure(function Login({ login, isLoggedIn }: Props) {
  if (isLoggedIn) {
    return (<div>Hello World</div>);
  }
  
  return (<button onClick={login}>Login</button>);
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginContainer);
