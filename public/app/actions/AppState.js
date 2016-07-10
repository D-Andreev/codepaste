var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/Constants');

var AppStateActions = {

  /**
   * @param  {object} props
   */
  init: function(props) {
    AppDispatcher.dispatch({
      actionType: Constants.INIT,
      props: props
    });
  },

  /**
   * Set username
   * @param username
     */
  setUsername: function(username) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_USERNAME,
      username: username
    });
  },

  /**
   * set Password
   * @param password
     */
  setPassword: function(password) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_PASSWORD,
      password: password
    });
  },

  /**
   * Set email
   * @param email
     */
  setEmail: function(email) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_EMAIL,
      email: email
    });
  },

  /**
   * Set view
   * @param view
     */
  setView: function(view) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_VIEW,
      view: view
    });
  },

  /**
   * Set Toast
   * @param toast
     */
  setToast: function(toast) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_TOAST,
      toast: toast
    });
  },

  /**
   * Register
   * @param username
   * @param email
   * @param password
     */
  register: function(username, email, password) {
    AppDispatcher.dispatch({
      actionType: Constants.REGISTER,
      username: username,
      email: email,
      password: password
    });
  },

  /**
   * Login
   * @param email
   * @param password
     */
  login: function(email, password) {
    AppDispatcher.dispatch({
      actionType: Constants.LOGIN,
      email: email,
      password: password
    });
  }

};

module.exports = AppStateActions;
