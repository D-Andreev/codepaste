var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _url = '';
var _view = '';
var _user = {};

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


function register() {
    
}

function login() {

}

var AppStateStore = assign({}, EventEmitter.prototype, {

    getUrl: function () {
        return _url;
    },

    getView: function () {
      return _view;
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

// Register callback to handle all updates
AppDispatcher.register(function(action) {
    var props, username, password, email;

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

        case Constants.REGISTER:
            _register();
            AppStateStore.emitChange();
            break;

        case Constants.LOGIN:
            _login();
            AppStateStore.emitChange();
            break;

    default:
      // no op
    }
});

module.exports = AppStateStore;
