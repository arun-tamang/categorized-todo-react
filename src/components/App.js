import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import TodoListContainer from '../containers/TodoListContainer';
import Home from './home/HomePage';
import Login from './forms/Login';
import Register from './forms/Register';
import NavBar from './navs/navigation';

const App = (props) => {
  return (
    <Router>
      <div className="App">
        <NavBar
          authenticated={props.user.authenticated}
          handleLogOut={props.handleLogOut}
        />
        <Route exact path="/" component={Home} />
        <Route
          path="/login"
          render={(routerProps) =>
            Login(routerProps, {
              setLoginEmail: props.setLoginEmail,
              setLoginPassword: props.setLoginPassword,
              authenticated: props.user.authenticated,
              handleLogClick: props.handleLogIn
            })
          }
        />
        <Route
          path="/register"
          render={(routerProps) => (
            <Register
              onSubmit={props.handleRegister}
              routerProps={routerProps}
              authenticated={props.user.authenticated}
            />
          )}
        />
        <Route
          path="/todo"
          render={(routerProps) => {
            return props.user.authenticated ? (
              <TodoListContainer />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: routerProps.location }
                }}
              />
            );
          }}
        />
      </div>
    </Router>
  );
};

export default App;
