import SERVICES from '../services/serviceContainer';
import * as Types from '../utils/constants/appActionTypes';

// request tokens
export function requestTokens(userInfo) {
  return {
    type: Types.REQUEST_TOKENS,
    payload: {
      userInfo
    }
  };
}

export function receiveTokensAndUserDetails(tokens, userDetails) {
  return {
    type: Types.RECEIVE_TOKENS_AND_USERDETAILS,
    payload: {
      tokens,
      userDetails
    }
  };
}

export function removeTokensAndUserDetails() {
  return {
    type: Types.REMOVE_TOKENS_AND_USERDETAILS
  };
}

export function setAuthentication(authenticated = false) {
  return {
    type: Types.SET_AUTHENTICATION,
    payload: {
      authenticated
    }
  };
}

export function setLoginEmail(email) {
  return {
    type: Types.SET_LOGIN_EMAIL,
    payload: {
      email
    }
  };
}

export function setLoginPassword(password) {
  return {
    type: Types.SET_LOGIN_PASSWORD,
    payload: {
      password
    }
  };
}

// login
export function login(userInfo) {
  return (dispatch) => {
    // dispatch(requestTokens(userInfo));
    return SERVICES.login(userInfo).then(
      (response) => {
        if (response) {
          let { tokens } = response.data;
          let userDetails = response.data.userInfo;
          SERVICES.setTokenInHeader(tokens.accessToken);
          dispatch(receiveTokensAndUserDetails(tokens, userDetails));
          dispatch(setAuthentication(true));

          return { tokens, userDetails };
        }
      },
      (err) => console.log(err)
    );
  };
}

// register
export function register(newUserDetails) {
  return (dispatch) => {
    return SERVICES.register(newUserDetails).then((response) => {
      return response;
    });
  };
}

export function resetStore(defaultState) {
  return {
    type: Types.RESET_STORE,
    payload: {
      defaultState
    }
  };
}
