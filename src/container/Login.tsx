import * as React from 'react';
import { connect } from "react-redux";
import { pure } from "recompose";
import { bindActionCreators, Dispatch } from "redux";
import { login } from "../actions";
import { State } from "../reducers";

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  login: () => void;
}

type Props = StateProps & DispatchProps;

const mapStateToProps = (state: State): StateProps => {
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

const Login = pure(function Login({ login, isLoggedIn }: Props) {
  console.log(login)
  if (isLoggedIn) {
    return (<div>Hello World</div>);
  }
  
  return (<button onClick={login}>Login</button>);
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
