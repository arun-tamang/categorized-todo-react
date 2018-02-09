const removeTokensAndUserDetails = (state) => {
  return {
    ...state,
    tokens: '',
    userDetails: ''
  };
};

const receiveTokensAndUserDetails = (state, action) => {
  return {
    ...state,
    tokens: action.payload.tokens,
    userDetails: {
      email: action.payload.userDetails.email,
      id: action.payload.userDetails.id
    }
  };
};

const setAuthentication = (state, action) => {
  return {
    ...state,
    authenticated: action.payload.authenticated
  };
};


const user = (state = [], action) => {
  // console.log('from user:', action.type);
  // return action;
  switch (action.type) {
    case 'SET_AUTHENTICATION':
      return setAuthentication(state, action);
    case 'RECEIVE_TOKENS_AND_USERDETAILS':
      return receiveTokensAndUserDetails(state, action);
    case 'REMOVE_TOKENS_AND_USERDETAILS':
      return removeTokensAndUserDetails(state);
    // case 'RESET_STORE':
    //   return action.payload.defaultState.user;
    default:
      return state;
  }
};

export default user;
