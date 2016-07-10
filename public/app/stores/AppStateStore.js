var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ApiUtils = require('../Utils/ApiUtils');
var LocalStorage = require('../Utils/LocalStorage');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _url = '';
var _view = '';
var _user = LocalStorage.getUser() || {username: '', password: '', email: ''};console.log('setting view', view);
var _toast = '';
var _toastType = 'notification';
var _registerBtnDisabled = false;
var _loginBtnDisabled = false;

/**
 * Init app
 * @param  {object} props
 */
function _init(props) {
    _url = props.url;
    _view = props.view;
    if (_user.token) _view = 'app';
}

/**
 * Set username
 * @param username
 * @private
 */
function _setUsername(username) {
    _user.username = username;
}

/**
 * Set password
 * @param password
 * @private
 */
function _setPassword(password) {
    _user.password = password;
}

/**
 * Set email
 * @param email
 * @private
 */
function _setEmail(email) {
    _user.email = email;
}

/**
 * Set view
 * @param view
 * @private
 */
function _setView(view) {
    _view = view;
    if (view != 'app') _user = {};
    AppStateStore.emitChange();
}

/**
 * Set Toast
 * @param toast
 * @private
 */
function _setToast(toast) {
    _toast = toast;
}

/**
 * Set register button timeout
 * @private
 */
function _setRegisterButtonTimeout() {
    _registerBtnDisabled = true;
    AppStateStore.emitChange();
    setTimeout(function() {
        _registerBtnDisabled = false;
        AppStateStore.emitChange();
    }, 3000);
}

/**
 * Set login button timeout
 * @private
 */
function _setLoginButtonTimeout() {
    _loginBtnDisabled = true;
    AppStateStore.emitChange();
    setTimeout(function() {
        _loginBtnDisabled = false;
        AppStateStore.emitChange();
    }, 3000);
}

/**
 * Register
 * @param username
 * @param email
 * @param password
 * @private
 */
function _register(username, email, password) {
    _setRegisterButtonTimeout();
    if (!username || !email || !password) {
        _toast = 'All fields are required!';
        _toastType = 'warning';
        AppStateStore.emitChange();
        return;
    }

    ApiUtils.register(_url, username, email, password, function(err, response) {
        if (err) return;
        if (response.statusCode == 200) {
            _user = {username: username, email: email, password: password};
            _toast = 'User registered successfully!';
            _toastType = 'success';
            _setView('login');
            AppStateStore.emitChange();
        } else {
            _toast = response.body;
            _toastType = 'error';
            AppStateStore.emitChange();
        }
    });
}

/**
 * Login
 * @param username
 * @param password
 * @private
 */
function _login(username, password) {
    _setLoginButtonTimeout();
    if (!username || !password) {
        _toast = 'All fields are required!';
        _toastType = 'warning';
        AppStateStore.emitChange();
        return;
    }

    ApiUtils.login(_url, username, password, function(err, response) {
        if (err) return;
        if (response.statusCode == 201) {
            _saveLoggedInUser(response.body);
            _setToastNotification('Logged in!', 'success');
            _setView('app');
            AppStateStore.emitChange();
        } else {
            _setToastNotification(response.body, 'error');
            AppStateStore.emitChange();
        }
    });
}

/**
 * Save logged in user.
 * @param user
 * @private
 */
function _saveLoggedInUser(user) {
    _user = user;
    LocalStorage.setUser(_user);
}

/**
 * Set toast
 * @param message
 * @param type
 * @private
 */
function _setToastNotification(message, type) {
    _toast = message;
    _toastType = type;
}

/**
 * App Store
 */
var AppStateStore = assign({}, EventEmitter.prototype, {

    getUrl: function () {
        return _url;
    },

    getView: function () {
      return _view;
    },

    getLoginBtnDisabled: function() {
        return _loginBtnDisabled;
    },

    getUser: function() {
        return _user;
    },

    getRegisterBtnDisabled: function() {
        return _registerBtnDisabled;
    },

    getToast: function () {
        return _toast;
    },

    getToastType: function () {
        return _toastType;
    },

    /**
     * Emit change
     */
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    /**
    * @param {function} callback
    */
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
    * @param {function} callback
    */
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

/**
 * Register callback to handle all updates
 */
AppDispatcher.register(function(action) {
    var props, username, password, email, view;

    switch(action.actionType) {
        case Constants.INIT:
            props = action.props;
            if (props) {
                _init(props);
                AppStateStore.emitChange();
            }
            break;

        case Constants.SET_USERNAME:
            username = action.username;
            _setUsername(username);
            AppStateStore.emitChange();
            break;

        case Constants.SET_PASSWORD:
            password = action.password;
            _setPassword(password);
            AppStateStore.emitChange();
            break;

        case Constants.SET_EMAIL:
            email = action.email;
            _setEmail(email);
            AppStateStore.emitChange();
            break;

        case Constants.SET_VIEW:
            view = action.view;
            if (view) {
                if (view == 'registration' || view == 'login') _user = {};
                _setView(view);
                AppStateStore.emitChange();
            }
            break;

        case Constants.REGISTER:
            username = action.username;
            email = action.email;
            password = action.password;
            _register(username, email, password);
            AppStateStore.emitChange();
            break;

        case Constants.LOGIN:
            username = action.username;
            password = action.password;
            _login(username, password);
            AppStateStore.emitChange();
            break;

        case Constants.SET_TOAST:
            _setToast();
            AppStateStore.emitChange();
            break;

    default:
      // no op
    }
});

module.exports = AppStateStore;
