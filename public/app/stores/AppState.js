var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ApiUtils = require('../Utils/ApiUtils');
var LocalStorage = require('../Utils/LocalStorage');
var Router = require('../Utils/Router');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var DEFAULT_USER = {username: '', password: '', email: '', firstName: '', lastName: ''};
var DEFAULT_CM_OPTIONS = {
    lineNumbers: true,
    readOnly: false,
    mode: {
        name: 'javascript'
    },
    theme: 'pastel-on-dark',
    extraKeys: {
        'Ctrl-Space': 'autocomplete'
    },
    matchBrackets: true,
    closeBrackets: true,
    closeTag: true,
    continueList: true,
    indentWithTabs: true,
    lineWrapping: true
};

var _url = '';
var _view = '';
var _user = LocalStorage.getUser() || DEFAULT_USER;
var _toast = '';
var _toastType = 'notification';
var _registerBtnDisabled = false;
var _loginBtnDisabled = false;
var _fieldsDisabled = false;
var _createNewBtnDisabled = false;
var _pasteId = 0;
var _viewedPaste = null;
var _cmOptions = DEFAULT_CM_OPTIONS;
var _title = '';


/**
 * Init app
 * @param  {object} props
 */
function _init(props) {
    _url = props.url;
    _route();
}

/**
 * User is logged in
 * @returns {*}
 * @private
 */
function _userIsLoggedIn() {
    return _user.token && _user.refreshToken;
}

/**
 * Route
 * @param path
 * @private
 */
function _route(path) {
    var view;
    if (!path) view = Router.getViewFromUrl();
    else view ={name: path};
    console.log('view from url', view, path);
    var userIsLoggedIn = _userIsLoggedIn();
    if (!userIsLoggedIn) {
        if (view.name == 'registration') _setView('registration');
        else _setView('login');
    } else {
        if (view.name == '/') return _setView('pastes');
        var props = false;
        if (view.name == 'paste') {
            props = {id: view.props.id};
            _cmOptions.readOnly = true;
            console.log('fuck', _cmOptions);
            if (_viewedPaste) return _setView(view, props);
            
            ApiUtils.getPaste(_url, view.props.id, function(err, response) {
                if (err) return _setToastNotification('Error in service!', 'error');
                console.log('response get viewed paste', err, response);
                if (response) {
                    _viewedPaste = response;
                    _title = response.title;
                    _setView('paste', view.props);
                } else {
                    _viewedPaste = null;
                    _setToast('Error getting paste!', 'error');
                    _setView('pastes');
                }
            });
        } else if (view.name == 'new') {
            _viewedPaste = null;
            _title = '';
            _cmOptions.readOnly = false;
            _cmOptions.mode = 'javascript';
            _pasteId = 0;
            console.log('Setting new view', _cmOptions);
            _setView('new');
        } else if (view.name == 'pastes') {
            _setView('pastes');
        } else if (view.name == 'contacts') {
            _setView('contacts');
        }
    }
}

/**
 * Set view
 * @param view
 * @param props
 * @private
 */
function _setView(view, props) {
    if (typeof view == 'string') view = {name: view};
    _view = view.name;
    if (_view == 'paste') {
        _cmOptions.readOnly = true;
    } else if (_view == 'new') {
        _title = '';
        _viewedPaste = null;
        _pasteId = 0;
        _cmOptions.readOnly = false;
        _cmOptions.mode = 'javascript'
    }
    console.log('setting view', view, _cmOptions);
    Router.setUrl('#' + view.name, props);
    AppStateStore.emitChange();
}

/**
 * Create new
 * @param value
 * @param title
 * @param mode
 * @returns {*}
 * @private
 */
function _createNew(value, title, mode) {
    _setCreateNewButtonTimeout();
    console.log('Creating new paste', value, title, mode);
    if (!value) {
        _toast = 'Please paste code!';
        _toastType = 'warning';
        return AppStateStore.emitChange();
    }

    ApiUtils.createNew(_url, _user, {value: value, title: title, mode: mode}, function(err, response) {
        if (err) return _setToastNotification('Service error!', 'error');
        if (response) {
            _pasteId = response._id;
            _viewedPaste = response;
            _viewedPaste.user = {username: _user.user.username};
            _cmOptions.readOnly = false;
            console.log('create new response', response, _cmOptions);
            _setView('paste', {id: _pasteId});
        } else {
            _setToastNotification('Error creating new paste!', 'error');
            AppStateStore.emitChange();
        }
    });
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
    _fieldsDisabled = true;
    AppStateStore.emitChange();
    setTimeout(function() {
        _registerBtnDisabled = false;
        _fieldsDisabled = false;
        AppStateStore.emitChange();
    }, 3000);
}

/**
 * Set login button timeout
 * @private
 */
function _setLoginButtonTimeout() {
    _loginBtnDisabled = true;
    _fieldsDisabled = true;
    AppStateStore.emitChange();
    setTimeout(function() {
        _loginBtnDisabled = false;
        _fieldsDisabled = false;
        AppStateStore.emitChange();
    }, 3000);
}

/**
 * Set create new timeout
 * @private
 */
function _setCreateNewButtonTimeout() {
    _createNewBtnDisabled = true;
    AppStateStore.emitChange();
    setTimeout(function() {
        _createNewBtnDisabled = false;
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
        return AppStateStore.emitChange();
    }

    console.log('login', username, password);

    ApiUtils.login(_url, username, password, function(err, response) {
        console.log('res', err, response);
        if (err) return _setToastNotification('Service error!', 'error');
        if (response) {
            _saveLoggedInUser(response.body);
            _setView('pastes');
        } else {
            _setToastNotification(response.body, 'error');
            AppStateStore.emitChange();
        }
    });
}

/**
 * Set mode
 * @param mode
 * @private
 */
function _setMode(mode) {
    _cmOptions.mode = mode;
    if (_viewedPaste) _viewedPaste.mode = mode;
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
 * Set First Name
 * @param firstName
 * @private
 */
function _setFirstName(firstName) {
    _user.firstName = firstName;
}

/**
 * Set last name
 * @param lastName
 * @private
 */
function _setLastName(lastName) {
    _user.lastName = lastName;
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
 * Save logged in user.
 * @param user
 * @private
 */
function _saveLoggedInUser(user) {
    _user = user;
    LocalStorage.setUser(_user);
}

/**
 * Logout
 * @private
 */
function _logout() {
    _user = DEFAULT_USER;
    LocalStorage.clearUser();
    location.reload();
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
 * Set title
 * @param title
 * @private
 */
function _setTitle(title) {
    _title = title;
}

/**
 * App Store
 */
var AppStateStore = assign({}, EventEmitter.prototype, {

    /**
     * Get url
     * @returns {string}
     */
    getUrl: function () {
        return _url;
    },

    /**
     * Get view
     * @returns {string}
     */
    getView: function () {
      return _view;
    },

    /**
     * Get login button disabled
     * @returns {boolean}
     */
    getLoginBtnDisabled: function() {
        return _loginBtnDisabled;
    },

    /**
     * Get register button disabled
     * @returns {boolean}
     */
    getRegisterBtnDisabled: function() {
        return _registerBtnDisabled;
    },

    /**
     * Get user
     * @returns {*|{username: string, password: string, email: string}}
     */
    getUser: function() {
        return _user;
    },

    /**
     * Get toast
     * @returns {string}
     */
    getToast: function () {
        return _toast;
    },

    /**
     * Get toast type.
     * @returns {string}
     */
    getToastType: function () {
        return _toastType;
    },

    /**
     * Get fields disabled
     * @returns {boolean}
     */
    getFieldsDisabled: function () {
        return _fieldsDisabled;
    },

    /**
     * Get create new paste button disabled
     * @returns {*}
     */
    getCreateNewBtnDisabled: function () {
        return _createNewBtnDisabled;
    },

    /**
     * Get viewed paste
     * @returns {*}
     */
    getViewedPaste: function () {
        return _viewedPaste;
    },

    /**
     * Get Code mirror options
     * @returns {{options: {readOnly: *, mode: {name: string}, theme: string, extraKeys: {Ctrl-Space: string}, matchBrackets: boolean, closeBrackets: boolean, closeTag: boolean, continueList: boolean}}}
     */
    getCmOptions: function () {
        return _cmOptions;
    },

    /**
     * Get title
     * @returns {string}
     */
    getTitle: function () {
        return _title;
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

        case Constants.SET_FIRST_NAME:
            firstName = action.firstName;
            _setFirstName(firstName);
            AppStateStore.emitChange();
            break;

        case Constants.SET_LAST_NAME:
            lastName = action.lastName;
            _setLastName(lastName);
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
                _setView(view);
                AppStateStore.emitChange();
            }
            break;

        case Constants.REGISTER:
            username = action.username;
            email = action.email;
            password = action.password;
            _register(username, email, password);
            break;

        case Constants.LOGIN:
            username = action.username;
            password = action.password;
            console.log('login', username, password);
            _login(username, password);
            break;

        case Constants.LOGOUT:
            _logout();
            AppStateStore.emitChange();
            break;

        case Constants.SET_TOAST:
            _setToast();
            AppStateStore.emitChange();
            break;

        case Constants.NAVIGATE:
            var path = action.path;
            _route(path);
            AppStateStore.emitChange();
            break;

        case Constants.CREATE_NEW:
            var value = action.value;
            var title = action.title;
            var mode = action.mode;
            console.log('action', action);
            _createNew(value, title, mode);
            AppStateStore.emitChange();
            break;

        case Constants.SET_MODE:
            var mode = action.mode;
            console.log('action', action);
            _setMode(mode);
            AppStateStore.emitChange();
            break;

        case Constants.CHANGE_TITLE:
            var title = action.title;
            console.log('action', action);
            _setTitle(title);
            AppStateStore.emitChange();
            break;

    default:
      // no op
    }
});

module.exports = AppStateStore;
