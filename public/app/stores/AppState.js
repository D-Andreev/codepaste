var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ApiUtils = require('../Utils/ApiUtils');
var LocalStorage = require('../Utils/LocalStorage');
var Router = require('../Utils/Router');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var DISABLE_TIMEOUT = 3000;
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

var _loading = true;
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
var _pastes = [];
var _filter = {};
var _pagination = {skip: 0, limit: 10};
var _sort = {col: 'created', direction: -1};
var _socket = null;
var _totalPastes = 0;

/**
 * Get filter
 * @returns {{}}
 * @private
 */
function _getFilter() {
    return _filter;
}

/**
 * Get pagination
 * @returns {{skip: number}}
 * @private
 */
function _getPagination() {
    return _pagination;
}

/**
 * Get sort
 * @private
 */
function _getSort() {
    var sort = {};
    sort[_sort.col] = _sort.direction;
    return {
        sort: sort
    }
}

/**
 * Paginate
 * @param skip
 * @private
 */
function _paginate(skip) {
    if (skip) _pagination.skip = (skip * _pagination.limit) - _pagination.limit;
    else _pagination.skip = 0;
    _sendMessage();
}

/**
 * Init ws
 * @private
 */
function _initWs() {
    if (_socket) return;
    _socket = new WebSocket("ws://localhost:666/echo", "protocolOne");
    _socket.onopen = function () {
        _socket.send(JSON.stringify({
                query: _getFilter(),
                pagination: _getPagination(),
                sort: _getSort()
            }));
    };
    _socket.onmessage = function (event) {
        var data;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            return;
        }
        console.log('onmessage', data);
        if (data.res.action && data.res.action == 'update') {
            _filterAndSort();
        } else {
            _pastes = data.res;
            _totalPastes = data.total;
            AppStateStore.emitChange();
        }
    };
}

/**
 * Filter and sort
 * @private
 */
function _filterAndSort() {
    var filter = {};
    if (typeof _getFilter() == 'string') filter = _setSearchQuery(_filter);
    _socket.send(JSON.stringify({
        query: filter,
        pagination: _getPagination(),
        sort: _getSort()
    }));
}

/**
 * Sort
 * @param col
 * @param direction
 * @private
 */
function _sortGrid(col, direction) {
    _sort = {col: col, direction: direction};
    _filterAndSort();
}

/**
 * Set search query
 * @param message
 * @returns {{$or: *[]}}
 * @private
 */
function _setSearchQuery(message) {
    return {
        $or: [
            {'user.user.username': {$regex : message}},
            {'title': {$regex : message}},
            {'mode': {$regex : message}},
            {'code': {$regex : message}}
        ]
    }
}

/**
 * Send message
 * @param message
 * @private
 */
function _sendMessage(message) {
    _filter = message ? message : '';
    _socket.send(JSON.stringify({
        query: _setSearchQuery(_filter),
        pagination: _getPagination(),
        sort: _getSort()
    }));
}

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
 * View props
 * @param path
 * @param viewProps
 * @private
 */
function _route(path, viewProps) {
    var view;
    if (!path) view = Router.getViewFromUrl();
    else view ={name: path};

    var userIsLoggedIn = _userIsLoggedIn();
    if (!userIsLoggedIn) {
        if (view.name == 'registration') _setView('registration');
        else _setView('login');
    } else {
        _initWs();
        if (view.name == '/') return _setView('pastes');
        var props = false;
        if (view.name == 'paste') {
            var pasteId;
            if (view.props && view.props.id) pasteId = view.props.id;
            else if (viewProps && viewProps.id) {
                pasteId = viewProps.id;
                _viewedPaste = null;
            }
            props = {id: pasteId};
            _cmOptions.readOnly = true;
            if (_viewedPaste) return _setView(view, props);

            ApiUtils.getPaste(_user.token, _url, pasteId, function(err, response) {
                if (err) {
                    if (err.status >= 500 && err.status < 600) return _setToastNotification('Service error!', 'error');
                    if (err.status == 401) return _logout();
                    else if (err.status == 404) return _setToastNotification('User does not exist!', 'error');
                }
                _viewedPaste = response;
                _title = response.title;
                _setView('paste', props);
            });
        } else if (view.name == 'new') {
            _viewedPaste = null;
            _title = '';
            _cmOptions.readOnly = false;
            _cmOptions.mode = 'javascript';
            _pasteId = 0;
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
    _setLoading(true);
    if (!value) {
        _toast = 'Please paste code!';
        _toastType = 'warning';
        _setLoading(false);
        return AppStateStore.emitChange();
    }

    ApiUtils.createNew(_url, _user, {value: value, title: title, mode: mode}, function(err, response) {
        if (err) {
            _setLoading(false);
            return _setToastNotification('Service error!', 'error');
        }
        if (response) {
            _pasteId = response._id;
            _viewedPaste = response;
            _viewedPaste.user = {username: _user.user.username};
            _cmOptions.readOnly = false;
            _setView('paste', {id: _pasteId});
            _setLoading(false);
        } else {
            _setLoading(false);
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
    }, DISABLE_TIMEOUT);
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
    }, DISABLE_TIMEOUT);
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
    }, DISABLE_TIMEOUT);
}

/**
 * Register
 * @param username
 * @param email
 * @param password
 * @private
 */
function _register(username, email, password) {
    _setLoading(true);
    _setRegisterButtonTimeout();
    if (!username || !email || !password) {
        _toast = 'Please enter all required fields!';
        _toastType = 'warning';
        _setLoading(false);
        AppStateStore.emitChange();
        return;
    }

    ApiUtils.register(_url, username, email, password, function(err, response) {
        if (err) {
            _setLoading(false);
            _setToastNotification('Service error!', 'error');
            return AppStateStore.emitChange();
        }
        if (response.statusCode == 200) {
            _user = {username: username, email: email, password: password};
            _toast = 'User registered successfully!';
            _toastType = 'success';
            _setView('login');
            _setLoading(false);
            AppStateStore.emitChange();
        } else {
            _toast = response.body;
            _toastType = 'error';
            _setLoading(false);
            AppStateStore.emitChange();
        }
    });
}

/**
 * Set Loading
 * @param loading
 * @private
 */
function _setLoading(loading) {
    _loading = loading;
}

/**
 * Login
 * @param username
 * @param password
 * @private
 */
function _login(username, password) {
    _setLoginButtonTimeout();
    _setLoading(true);
    if (!username || !password) {
        _toast = 'All fields are required!';
        _toastType = 'warning';
        return AppStateStore.emitChange();
    }

    ApiUtils.login(_url, username, password, function(err, response) {
        if (err) {
            _setLoading(false);
            _setToastNotification('Service error!', 'error');
            return AppStateStore.emitChange();
        }
        if (response.statusCode == 201) {
            _initWs();
            _saveLoggedInUser(response.body);
            _setView('pastes');
            _setLoading(false);
        } else {
            _setLoading(false);
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
     * Get Loading
     */
    getLoading: function() {
        return _loading;
    },

    /**
     * Get pastes
     * @returns {Array}
     */
    getPastes: function() {
        return _pastes;
    },

    /**
     * Get sort
     * @returns {{created: number}}
     */
    getSort: function() {
        return _sort;
    },

    /**
     * Get pagination
     * @returns {{skip: number}}
     */
    getPagination: function () {
        return _pagination;
    },

    /**
     * Get total pastes
     * @returns {number}
     */
    getTotalPastes: function () {
        return _totalPastes;
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
            var viewProps = action.viewProps;
            if (view) {
                _setView(view, viewProps);
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
            props = action.props;
            _route(path, props);
            AppStateStore.emitChange();
            break;

        case Constants.CREATE_NEW:
            var value = action.value;
            var title = action.title;
            var mode = action.mode;
            _createNew(value, title, mode);
            AppStateStore.emitChange();
            break;

        case Constants.SET_MODE:
            var mode = action.mode;
            _setMode(mode);
            AppStateStore.emitChange();
            break;

        case Constants.CHANGE_TITLE:
            var title = action.title;
            _setTitle(title);
            AppStateStore.emitChange();
            break;

        case Constants.SHOW_TOAST:
            var message = action.message;
            var type = action.type;
            _setToastNotification(message, type);
            AppStateStore.emitChange();
            break;

        case Constants.SET_LOADING:
            var loading = action.loading;
            _setLoading(loading);
            AppStateStore.emitChange();
            break;

        case Constants.SEARCH:
            var query = action.query;
            _sendMessage(query);
            break;

        case Constants.SORT:
            var col = action.col;
            var direction = action.direction;
            _sortGrid(col, direction);
            break;

        case Constants.PAGINATE:
            var skip = action.skip;
            _paginate(skip);
            break;

    default:
      // no op
    }
});

module.exports = AppStateStore;
