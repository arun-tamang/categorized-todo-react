const logInDetails = (state = [], action) => {
  switch (action.type) {
    case 'SET_LOGIN_EMAIL':
      return { ...state, email: action.payload.email };
    case 'SET_LOGIN_PASSWORD':
      return { ...state, password: action.payload.password };
    case 'RESET_STORE':
      return action.payload.defaultState.logInDetails
    default:
      return state;
  }
};

export default logInDetails;
