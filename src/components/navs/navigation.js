import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/userService/logoutService';

const NavBar = (props) => {

  const handleLogOut = () => {
    logout()
      .then((data) => {
        if(data) {
          props.handleLogOut();
        } else {
          console.log('can\'t seem to logout');
        }
      });
  };

  if (props.authenticated === false) {
    return (
      <nav className="navbar navbar-inverse">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">
              WhatToDo?
            </Link>
          </div>
          <ul className="nav navbar-nav">
            <li>
              <Link to="/todo">Todos</Link>
            </li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="/login"><i className='fa fa-user' /> Login</Link>
            </li>
            <li>
              <Link to="/register"><i className='fa fa-user-plus' /> Register</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
  return (
    <nav className="navbar navbar-inverse">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            WhatToDo?
          </Link>
        </div>
        <ul className="nav navbar-nav">
          <li>
            <Link to="/todo">Todos</Link>
          </li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li>
            <Link onClick={handleLogOut} to="/">
              <i className='fa fa-sign-out' />
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
