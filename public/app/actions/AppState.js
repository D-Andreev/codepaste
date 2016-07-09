var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var TodoActions = {

  /**
   * @param  {object} props
   */
  init: function(props) {
    AppDispatcher.dispatch({
      actionType: Constants.INIT,
      props: props
    });
  },

  setUsername: function(username) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_USERNAME,
      username: username
    });
  },

  setPassword: function(password) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_PASSWORD,
      password: password
    });
  },

  setEmail: function(email) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_EMAIL,
      email: email
    });
  }

};

module.exports = TodoActions;
