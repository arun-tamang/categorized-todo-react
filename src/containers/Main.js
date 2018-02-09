import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/appActionCreators';
import {
  fetchTodos,
  fetchTags,
  fetchTodoCategories
} from '../actions/todoActionCreators';
import App from '../components/App';

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

const Main = connect(mapStateToProps, mapDispachToProps)(App);

export default Main;
