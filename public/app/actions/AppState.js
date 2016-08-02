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
   * Set first name
   * @param firstName
     */
  setFirstName: function(firstName) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_FIRST_NAME,
      firstName: firstName
    });
  },

  /**
   * Set last name
   * @param lastName
     */
  setLastName: function(lastName) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_LAST_NAME,
      lastName: lastName
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
   * @param username
   * @param password
     */
  login: function(username, password) {
    AppDispatcher.dispatch({
      actionType: Constants.LOGIN,
      username: username,
      password: password
    });
  },

  /**
   * Logout
   */
  logout: function() {
    AppDispatcher.dispatch({
      actionType: Constants.LOGOUT
    });
  },

  /**
   * Navigate
   * @param path
     */
  navigate: function(path) {
    AppDispatcher.dispatch({
      actionType: Constants.NAVIGATE,
      path: path
    });
  },

  /**
   * Create new
   * @param value
   * @param title
   * @param mode
     */
  createNew: function(value, title, mode) {
    AppDispatcher.dispatch({
      actionType: Constants.CREATE_NEW,
      value: value,
      title: title,
      mode: mode
    });
  },

  /**
   * Set mode
   * @param mode
     */
  setMode: function(mode) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_MODE,
      mode: mode
    });
  },

  /**
   * Change title
   * @param title
     */
  changeTitle: function(title) {
    AppDispatcher.dispatch({
      actionType: Constants.CHANGE_TITLE,
      title: title
    });
  },

  /**
   * Set message content
   * @param messageContent
   */
  setMessageContent: function(messageContent) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_MESSAGE_CONTENT,
      messageContent: messageContent
    });
  },
  
  /**
   * Set message title
   * @param messageTitle
   */
  setMessageTitle: function(messageTitle) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_MESSAGE_TITLE,
      messageTitle: messageTitle
    });
  },

  /**
   * Show toast
   * @param message
   * @param type
     */
  showToast: function(message, type) {
    AppDispatcher.dispatch({
      actionType: Constants.SHOW_TOAST,
      message: message,
      type: type
    });
  },

  /**
   * Set loading
   * @param loading
     */
  setLoading: function(loading) {
    AppDispatcher.dispatch({
      actionType: Constants.SET_LOADING,
      loading: loading
    });
  },

  /**
   * Send contact
   * @param messageTitle
   * @param messageContent
   */
  sendMessage: function(messageTitle, messageContent) {
    AppDispatcher.dispatch({
      actionType: Constants.SEND_CONTACT,
      messageTitle: messageTitle,
      messageContent: messageContent
    });
  }
};

module.exports = AppStateActions;
