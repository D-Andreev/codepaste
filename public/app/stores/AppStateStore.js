var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var AppStateActions = require('../actions/AppState');
var ApiUtils = require('../Utils/ApiUtils');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _url = '';
var _view = '';
var _user = {
    email: '',
    username: '',
    password: ''
};
var _toast = '';
var _registerBtnDisabled = false;
var _loginBtnDisabled = false;

/**
 * Init app
 * @param  {object} props
 */
function _init(props) {
    _url = props.url;
    _view = props.view;
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
    console.log('setting view1', view);
    _view = view;
    _user = {
        email: '',
        username: '',
        password: ''
    };
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
 * Register
 * @param username
 * @param email
 * @param password
 * @private
 */
function _register(username, email, password) {
    console.log('store register', username, email, password);
    _registerBtnDisabled = true;
    AppStateStore.emitChange();
    setTimeout(function() {
        _registerBtnDisabled = false;
        AppStateStore.emitChange();
    }, 3000);
    ApiUtils.register(_url, username, email, password, function(err, response) {
        if (err) return;
        if (response.statusCode == 200) {
            _user = {username: username, email: email, password: password};
            console.log('The registered useres', _user);
            _toast = 'User registered successfully!';
            _setView('login');
            AppStateStore.emitChange();
        } else {
            _toast = response.body;
            console.log('set toast', _toast);
            AppStateStore.emitChange();
        }
    });
}

/**
 * Login
 * @param username
 * @param email
 * @private
 */
function _login(username, email) {
    console.log('store login', username, email);
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
            if (username) {
                _setUsername(username);
                AppStateStore.emitChange();
            }
            break;

        case Constants.SET_PASSWORD:
            password = action.password;
            if (password) {
                _setPassword(password);
                AppStateStore.emitChange();
            }
            break;

        case Constants.SET_EMAIL:
            email = action.email;
            if (email) {
                _setEmail(email);
                AppStateStore.emitChange();
            }
            break;

        case Constants.SET_VIEW:
            view = action.view;
            console.log('setting view2', view);
            if (view) {
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
            _login();
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
