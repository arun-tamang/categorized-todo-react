import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import '../styles/App.css';
import TodoListContainer from '../containers/TodoListContainer';
import Home from './home/HomePage';
import Login from './forms/Login';
import Register from './forms/Register';
import NavBar from './navs/navigation';
import { setTokenInHeader } from '../services/axiosService';
import myAxios from '../myAxios';
import { refreshAcsToken } from '../services/resourceService/refreshAcsToken';
import { defaultState } from '../store';

const App = (props) => {
  const refreshAndRepeat = (lastConfig) => {
    return refreshAcsToken()
      .then((response) => {
        // console.log('token refreshed');
        setTokenInHeader(response.data.accessToken);
        lastConfig.headers.Authorization = response.data.accessToken;

        return myAxios(lastConfig);
      })
      .catch((error) => {
        if (error.response.status === 403) {
          handleLogOut();
        }
      });
  };

  const addInterceptor = () => {
    myAxios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          // access token has to be refreshed.
          let lastConfig = error.response.config;

          return refreshAndRepeat(lastConfig);
        }

        return Promise.reject(error);
      }
    );
  };

  const handleLogIn = async (event, loginDetails) => {
    await props
      .login(loginDetails || props.logInDetails)
      .then((data) => {
        if (data) {
          localStorage.setItem(
            'currentUser',
            JSON.stringify({
              refreshToken: data.tokens.refreshToken,
              userDetails: {
                email: data.userDetails.email,
                id: data.userDetails.id
              },
              authenticated: true
            })
          );
          // addInterceptor();
        } else {
          console.log('login unsuccessful');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogOut = () => {
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
  };

  const handleRegister = (values) => {
    props.register(values)
      .then((response) => {
        if (response) {
          let { email } = response.data.data;
          let { password } = response.data.data;
          props.setLoginEmail(email);
          props.setLoginPassword(password);
          handleLogIn(null, { email, password });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const checkAuthentication = () => {
    if (props.user.authenticated === true) {
      addInterceptor();
      props.fetchTodos(props.user.userDetails.id, 1).then(() => {
        props.fetchTodoCategories(props.user.userDetails.id);
        props.fetchTags(props.user.userDetails.id);
      });
    }
    // note that the actions dispatched here are those that modify props of TodoList but not of
    // app itself and so it is fine. However if the actions dispatched were to modify the props passed
    // to the app, this would cause an infinite loop whenever authenticated is true;
  }

  checkAuthentication();

  return (
    <Router>
      <div className='App'>
        <NavBar authenticated={props.user.authenticated} handleLogOut={handleLogOut} />
        <Route exact path='/' component={Home} />
        <Route
          path='/login'
          render={routerProps =>
            Login(
              routerProps,
              {
                setLoginEmail: props.setLoginEmail,
                setLoginPassword: props.setLoginPassword,
                authenticated: props.user.authenticated,
                handleLogClick: handleLogIn
              }
            )
          }
        />
        <Route
          path='/register'
          render={routerProps => (
            <Register
              onSubmit={handleRegister}
              routerProps={routerProps}
              authenticated={props.user.authenticated}
            />
          )}
        />
        <Route
          path='/todo'
          render={(routerProps) => {
            return (
              props.user.authenticated ? (
                <TodoListContainer />
              ) : (
                  <Redirect to={{
                    pathname: '/login',
                    state: { from: routerProps.location }
                  }}
                  />
                )
            );
          }
          }
        />
      </div>
    </Router>
  );
};

export default App;
