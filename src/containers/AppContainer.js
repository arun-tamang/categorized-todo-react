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

const enhance = compose(
  connect(mapStateToProps, mapDispachToProps),
  withHandlers({
    handleLogIn: (props) => async (event, loginDetails) => {
      try {
        let loginResponse = await props.login(
          loginDetails || props.logInDetails
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
    },
    handleLogOut: (props) => () => {
      props.setAuthentication(false);
      props.removeTokensAndUserDetails();
      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          userEmail: '',
          authenticated: false
        })
      );
      props.resetStore(defaultState);
    },
    handleRegister: (props) => (values) => {
      props
        .register(values)
        .then((response) => {
          if (response) {
            let { email } = response.data.data;
            let { password } = response.data.data;
            props.setLoginEmail(email);
            props.setLoginPassword(password);
            props.handleLogIn(null, { email, password });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }),
  lifecycle({
    componentWillMount() {
      addInterceptor(this.props.handleLogout);
    }
  })
);

export default enhance(App);
