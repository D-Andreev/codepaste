var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/Constants');
var ApiUtils = require('../Utils/ApiUtils');
var LocalStorage = require('../Utils/LocalStorage');
var assign = require('object-assign');

var Contacts = require('./helpers/Contacts');
var User = require('./helpers/User');
var Ws = require('./helpers/Ws');
var CodeMirror = require('./helpers/CodeMirror');
var Toast = require('./helpers/Toast');
var View = require('./helpers/View');
var Paste = require('./helpers/Paste');
var Grid = require('./helpers/Grid');

Contacts = new Contacts();
User = new User(LocalStorage.getUser());
Ws = new Ws();
CodeMirror = new CodeMirror();
Toast = new Toast();
View = new View();
Paste = new Paste();
Grid = new Grid();

var CHANGE_EVENT = 'change';
var DISABLE_TIMEOUT = 3000;

/**
 * Init ws
 * @private
 */
function _initWs() {
    Ws.init();
    Ws.socket.onopen = function () {
        Ws.socket.send(JSON.stringify({
            query: Grid.getFilter(),
            pagination: Grid.getPagination(),
            sort: Grid.getSort()
        }));
    };
    Ws.socket.onmessage = function (event) {
        var data;
        try {
            data = JSON.parse(event.data);
        } catch (e) {
            return;
        }
        console.log('data', data);
        if (data.res.action && data.res.action == 'update') {
            _filterAndSort();
        } else {
            console.log('settings thepastes', data.res);
            Grid.setPastes(data.res);
            console.log('settings total', data.total);
            Grid.setTotalPastes(data.total);
            console.log('check123', Grid.getPastes(), Grid.getTotalPastes())
            AppStateStore.emitChange();
        }
    };

    Ws.socket.onclose = function() {
        Ws.destroy();
        _initWs();
    };
}

/**
 * Send message
 * @param message
 * @private
 */
function _sendMessage(message) {
    Grid.setFilter(message ? message : '');
    Ws.send(JSON.stringify({
        query: _setSearchQuery(Grid.getFilter()),
        pagination: Grid.getPagination(),
        sort: Grid.getSort()
    }));
}

/**
 * View props
 * @param path
 * @param viewProps
 * @private
 */
function _route(path, viewProps) {
    View.initView(path);
    View.setLoading(true);
    AppStateStore.emitChange();
    User.isLoggedIn(function(err) {
        if (err) {
            if (err.status == 401) {
                if (View.getView().name == 'registration') _setView('registration');
                else _setView('login');
                View.setLoading(false);
                return AppStateStore.emitChange();
            } else {
                _setView('login');
                _setNotification('Service error!', 'error');
            }
        }
        View.setLoading(false);
        _initWs();
        var view = View.getView();
        if (view.name == '/' || view.name == 'login' || view.name == 'registration') return _setView('pastes');
        var props = false;
        if (view.name == 'paste') {
            var pasteId;
            if (view.props && view.props.id) pasteId = view.props.id;
            else if (viewProps && viewProps.id) {
                pasteId = viewProps.id;
                Paste.destroy();
            }
            props = {id: pasteId};
            CodeMirror.setOption('readOnly', true);
            if (Paste.getPaste()) return _setView(View.getView(), props);

            Paste.request(User.getToken(), pasteId, function(err, response) {
                if (err) {
                    if (err.status >= 500 && err.status < 600) return Toast.setNotification('Service error!', 'error');
                    if (err.status == 401) return User.logout();
                    else if (err.status == 404) return Toast.setNotification('Paste does not exist!', 'error');
                }
                Paste.setPaste(response);
                Paste.setUser(User.getUser());
                _setView('paste', props);
            });
        } else if (view.name == 'new') {
            Paste.destroy();
            CodeMirror.setOption('readOnly', false);
            CodeMirror.setOption('mode', 'javascript');
            _setView('new');
        } else if (view.name == 'pastes') {
            _setView('pastes');
        } else if (view.name == 'contacts') {
            _setView('contacts');
        }
    });
}

/**
 * Set view
 * @param view
 * @param props
 * @private
 */
function _setView(view, props) {
    if (typeof view == 'string') View.setView({name: view});
    else View.setView(view.name);
    if (View.getView() == 'paste') {
        CodeMirror.setOption('readOnly', true);
    } else if (View.getView() == 'new') {
        Paste.destroy();
        CodeMirror.setOption('readOnly', false);
        CodeMirror.setOption('mode', 'javascript');
    }
    View.setUrl('#' + View.getViewName(), props);
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
    View.setLoading(true);
    AppStateStore.emitChange();
    if (!value) return _setNotification('Please paste code!', 'warning');
    ApiUtils.createNew(User.getUser(), {value: value, title: title, mode: mode}, function(err, response) {
        if (err) return _setNotification('Service error!', 'error');
        if (response) {
            Paste.setPasteId(response._id);
            Paste.setPaste(response);
            Paste.setUser(User.getUser());
            CodeMirror.setOption('readOnly', true);
            _setView('paste', {id: response._id});
            View.setLoading(false);
        } else {
            _setNotification('Error creating new paste!', 'error');
        }
    });
}

/**
 * Register
 * @param username
 * @param email
 * @param password
 * @private
 */
function _register(username, email, password) {
    View.setLoading(true);
    _setRegisterButtonTimeout();
    if (!username || !email || !password) return _setNotification('Please enter all required fields!', 'warning');
    ApiUtils.register(username, email, password, function(err, response) {
        if (err) return _setNotification('Service error!', 'error');
        if (response.statusCode == 200) {
            User.setUser({token: null, refreshToken: null, user: {username: username, email: email, password: password}});
            _setView('login');
            _setNotification('User registered successfully!', 'success');
        } else {
            _setNotification(response.body, 'error');
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
    View.setLoading(true);
    AppStateStore.emitChange();
    if (!username || !password) return _setNotification('All fields are required!', 'warning');

    ApiUtils.login(username, password, function(err, response) {
        if (err) return _setNotification('Service error!', 'error');
        if (response.statusCode == 201) {
            _initWs();
            User.saveUser(response.body);
            _setView('pastes');
            View.setLoading(false);
            AppStateStore.emitChange();
        } else {
            _setNotification(response.body, 'error');
        }
    });
}

/**
 * Send message
 * @private
 */
function _sendContactMessage() {
    _setSendMessageButtonTimeout();
    View.setLoading(true);
    AppStateStore.emitChange();
    if (!Contacts.getTitle() || !Contacts.getContent()) {
        return _setNotification('Title and content are required.', 'warning');
    }
    ApiUtils.sendMessage(User.getUser().user, Contacts.getMessage(), function(err) {
        if (err && err.text != 'Your message has been sent.') return _setNotification('Service error!', 'error');

        _setNotification('Message sent.', 'success');
        _setView('pastes');
    });
}

/**
 * App Store
 */
var AppStateStore = assign({}, EventEmitter.prototype, {

    /**
     * Get url
     * @returns {string}
     */
    getUrl: function () { return ApiUtils.getUrl(); },

    /**
     * Get view
     * @returns {string}
     */
    getView: function () { return View.getViewName(); },

    /**
     * Get login button disabled
     * @returns {boolean}
     */
    getLoginBtnDisabled: function() { return View.getLoginBtnDisabled(); },

    /**
     * Get register button disabled
     * @returns {boolean}
     */
    getRegisterBtnDisabled: function() { return View.getRegisterBtnDisabled(); },

    /**
     * Get user
     * @returns {*|{username: string, password: string, email: string}}
     */
    getUser: function() { return User.getUser(); },

    /**
     * Get toast
     * @returns {string}
     */
    getToast: function () { return Toast.getToast(); },

    /**
     * Get toast type.
     * @returns {string}
     */
    getToastType: function () { return Toast.getType(); },

    /**
     * Get fields disabled
     * @returns {boolean}
     */
    getFieldsDisabled: function () { return View.getFieldsDisabled(); },

    /**
     * Get create new paste button disabled
     * @returns {*}
     */
    getCreateNewBtnDisabled: function () { return View.getCreateNewBtnDisabled(); },

    /**
     * Get send message button disabled
     * @returns {*}
     */
    getSendMessageBtnDisabled: function() { return Contacts.getButtonDisabled(); },

    /**
     * Get viewed paste
     * @returns {*}
     */
    getViewedPaste: function () { return Paste.getPaste(); },

    /**
     * Get message title
     * @returns {*}
     */
    getMessageTitle: function() { return Contacts.getTitle(); },

    /**
     * Get message content
     * @returns {*}
     */
    getMessageContent: function() { return Contacts.getContent(); },

    /**
     * Get Code mirror options
     * @returns {{options: {readOnly: *, mode: {name: string}, theme: string, extraKeys: {Ctrl-Space: string}, matchBrackets: boolean, closeBrackets: boolean, closeTag: boolean, continueList: boolean}}}
     */
    getCmOptions: function () { return CodeMirror.getOptions(); },

    /**
     * Get title
     * @returns {string}
     */
    getTitle: function () { return Paste.getTitle(); },

    /**
     * Get Loading
     */
    getLoading: function() { return View.getLoading(); },

    /**
     * Get pastes
     * @returns {Array}
     */
    getPastes: function() { return Grid.getPastes(); },

    /**
     * Get sort
     * @returns {{sort}}
     */
    getSort: function() { return Grid.getSortOptions(); },

    /**
     * Get pagination
     * @returns {{skip: number}}
     */
    getPagination: function () { return Grid.getPagination(); },

    /**
     * Get total pastes
     * @returns {number}
     */
    getTotalPastes: function () { return Grid.getTotalPastes(); },

    /**
     * Emit change
     */
    emitChange: function() { this.emit(CHANGE_EVENT); },

    /**
     * @param {function} callback
     */
    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

    /**
     * @param {function} callback
     */
    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

/**
 * Register callback to handle all updates
 */
AppDispatcher.register(function(action) {
    var props, view;

    switch(action.actionType) {
        case Constants.INIT:
            props = action.props;
            if (props) {
                ApiUtils.setUrl(props.url);
                _route();
            }
            break;

        case Constants.SET_USERNAME:
            User.setUsername(action.username);
            AppStateStore.emitChange();
            break;

        case Constants.SET_FIRST_NAME:
            User.setFirstName(action.firstName);
            AppStateStore.emitChange();
            break;

        case Constants.SET_LAST_NAME:
            User.setLastName(action.lastName);
            AppStateStore.emitChange();
            break;

        case Constants.SET_PASSWORD:
            User.setPassword(action.password);
            AppStateStore.emitChange();
            break;

        case Constants.SET_EMAIL:
            User.setEmail(action.email);
            AppStateStore.emitChange();
            break;

        case Constants.SET_VIEW:
            view = action.view;
            if (view) {
                _setView(view, action.viewProps);
                AppStateStore.emitChange();
            }
            break;

        case Constants.REGISTER:
            _register(action.username, action.email, action.password);
            break;

        case Constants.LOGIN:
            _login(action.username, action.password);
            break;

        case Constants.LOGOUT:
            User.logout();
            break;

        case Constants.SET_TOAST:
            Toast.setToast(action.toast);
            AppStateStore.emitChange();
            break;

        case Constants.NAVIGATE:
            _route(action.path, action.props);
            AppStateStore.emitChange();
            break;

        case Constants.CREATE_NEW:
            _createNew(action.value, action.title, action.mode);
            AppStateStore.emitChange();
            break;

        case Constants.SET_MODE:
            CodeMirror.setOption('mode', action.mode);
            AppStateStore.emitChange();
            break;

        case Constants.CHANGE_TITLE:
            Paste.setTitle(action.title);
            AppStateStore.emitChange();
            break;

        case Constants.SHOW_TOAST:
            Toast.setNotification(action.message, action.type);
            AppStateStore.emitChange();
            break;

        case Constants.SET_LOADING:
            View.setLoading(action.loading);
            AppStateStore.emitChange();
            break;

        case Constants.SEARCH:
            _sendMessage(action.query);
            break;

        case Constants.SORT:
            _sortGrid(action.col, action.direction);
            break;

        case Constants.PAGINATE:
            _paginate(action.skip);
            break;

        case Constants.SEND_MESSAGE:
            _sendContactMessage();
            break;

        case Constants.SET_MESSAGE_TITLE:
            Contacts.setTitle(action.messageTitle);
            AppStateStore.emitChange();
            break;

        case Constants.SET_MESSAGE_CONTENT:
            Contacts.setContent(action.messageContent);
            AppStateStore.emitChange();
            break;

        default:
        // no op
    }
});


/**
 * Filter and sort
 * @private
 */
function _filterAndSort() {
    var filter = {};
    if (typeof Grid.getFilter() == 'string') filter = _setSearchQuery(Grid.getFilter());
    Ws.send(JSON.stringify({
        query: filter,
        pagination: Grid.getPagination(),
        sort: Grid.getSort()
    }));
}

/**
 * Sort
 * @param col
 * @param direction
 * @private
 */
function _sortGrid(col, direction) {
    Grid.setSort({col: col, direction: direction});
    _filterAndSort();
}

/**
 * Set search query
 * @param message
 * @returns {{$or: *[]}}
 * @private
 */
function _setSearchQuery(message) {
    if (typeof message != 'string') return {};
    return {
        $or: [
            {'user.user.username': {$regex : message, $options: '-i'}},
            {'title': {$regex : message, $options: '-i'}},
            {'mode': {$regex : message, $options: '-i'}}
        ]
    }
}

/**
 * Paginate
 * @param skip
 * @private
 */
function _paginate(skip) {
    var pagination = Grid.getPagination();
    if (skip) pagination.skip = (skip * pagination.limit) - pagination.limit;
    else pagination.skip = 0;
    _sendMessage(Grid.getFilter());
}

/**
 * Set register button timeout
 * @private
 */
function _setRegisterButtonTimeout() {
    View.setRegisterBtnDisabled(true);
    View.setFieldsDisabled(true);
    AppStateStore.emitChange();
    setTimeout(function() {
        View.setRegisterBtnDisabled(false);
        View.setFieldsDisabled(false);
        AppStateStore.emitChange();
    }, DISABLE_TIMEOUT);
}

/**
 * Set login button timeout
 * @private
 */
function _setLoginButtonTimeout() {
    View.setLoginBtnDisabled(true);
    View.setFieldsDisabled(true);
    AppStateStore.emitChange();
    setTimeout(function() {
        View.setLoginBtnDisabled(false);
        View.setFieldsDisabled(false);
        AppStateStore.emitChange();
    }, DISABLE_TIMEOUT);
}

/**
 * Set create new timeout
 * @private
 */
function _setCreateNewButtonTimeout() {
    View.setCreateNewBtnDisabled(true);
    AppStateStore.emitChange();
    setTimeout(function() {
        View.setCreateNewBtnDisabled(false);
        AppStateStore.emitChange();
    }, DISABLE_TIMEOUT);
}

/**
 * Set send message timeout
 * @private
 */
function _setSendMessageButtonTimeout() {
    Contacts.setButtonDisabled(true);
    AppStateStore.emitChange();
    setTimeout(function() {
        Contacts.setButtonDisabled(false);
        AppStateStore.emitChange();
    }, DISABLE_TIMEOUT);
}

function _setNotification(message, type) {
    View.setLoading(false);
    Toast.setNotification(message, type);
    return AppStateStore.emitChange();
}

module.exports = AppStateStore;
