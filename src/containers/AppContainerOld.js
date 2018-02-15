import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withHandlers, lifecycle } from 'recompose';
import App from '../components/App';
import { defaultState } from '../store';
import { addInterceptor } from '../services/axiosService';
import { setTokenInHeader } from '../services/axiosService';
import * as actionCreators from '../actions/appActionCreators';
import {
  fetchTodos,
  fetchTags,
  fetchTodoCategories
} from '../actions/todoActionCreators';
import '../styles/App.css';

class AppContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // console.log('app container constructor called');
  // }

  handleLogIn = async (event, loginDetails) => {
    try {
      let loginResponse = await this.props.login(
        loginDetails || this.props.logInDetails
      );
      if (loginResponse) {
        setTokenInHeader(loginResponse.tokens.accessToken);
        localStorage.setItem(
          'currentUser',
          JSON.stringify({
            refreshToken: loginResponse.tokens.refreshToken,
            userDetails: {
              email: loginResponse.userDetails.email,
              id: loginResponse.userDetails.id
            },
            authenticated: true
          })
        );
      } else {
        console.log('login unsuccessful');
      }
    } catch (err) {
      console.log('error in login', err);
    }
  };

  handleLogOut = () => {
    this.props.setAuthentication(false);
    this.props.removeTokensAndUserDetails();
    localStorage.setItem(
      'currentUser',
      JSON.stringify({
        userEmail: '',
        authenticated: false
      })
    );
    this.props.resetStore(defaultState);
  };

  handleRegister = (values) => {
    this.props
      .register(values)
      .then((response) => {
        if (response) {
          let { email } = response.data.data;
          let { password } = response.data.data;
          this.props.setLoginEmail(email);
          this.props.setLoginPassword(password);
          this.handleLogIn(null, { email, password });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  componentWillMount = () => {
    addInterceptor(this.handleLogOut);
  };

  render() {
    return (
      <App
        {...this.props}
        handleLogIn={this.handleLogIn}
        handleLogOut={this.handleLogOut}
        handleRegister={this.handleRegister}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    logInDetails: state.logInDetails,
    registerDetails: state.registerDetails
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(
    {
      ...actionCreators,
      fetchTodos,
      fetchTags,
      fetchTodoCategories
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispachToProps)(AppContainer);
