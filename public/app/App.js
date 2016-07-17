var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppStateActions = require('./actions/AppState');
var AppStateStore = require('./stores/AppState');
var Toast = require('./components/common/Toast');
var Content = require('./components/Content');

/**
 * Retrieve the current data from store
 */
function getAppState() {
    return {
        url: AppStateStore.getUrl(),
        view: AppStateStore.getView(),
        toast: AppStateStore.getToast(),
        toastType: AppStateStore.getToastType(),
        loginBtnDisabled: AppStateStore.getLoginBtnDisabled(),
        registerBtnDisabled: AppStateStore.getRegisterBtnDisabled(),
        user: AppStateStore.getUser(),
        fieldsDisabled: AppStateStore.getFieldsDisabled(),
        createNewPasteBtnDisabled: AppStateStore.getCreateNewBtnDisabled(),
        viewedPaste: AppStateStore.getViewedPaste(),
        cmOptions: AppStateStore.getCmOptions(),
        title: AppStateStore.getTitle()
    };
}

module.exports = React.createClass({
    propTypes: {
        url: ReactPropTypes.string.isRequired,
        view: ReactPropTypes.string
    },

    /**
     * Get initial state
     * @returns {{view: string, user: {username: string, password: string, email: string}}}
     */
    getInitialState: function() {
        return {
            view: 'login',
            user: {
                username: '',
                password: '',
                email: ''
            }
        }
    },

    /**
     * Component Did mount
     */
    componentDidMount: function() {
        AppStateStore.addChangeListener(this._onChange);
        AppStateActions.init(this.props);
        var $this = this;
        window.onpopstate = function() {
            AppStateActions.init($this.props);
        };
    },

    /**
     * Component will mount
     */
    componentWillUnmount: function() {
        AppStateStore.removeChangeListener(this._onChange);
    },

    /**
     * Render
     * @returns {XML}
     */
    render: function() {
        console.log('App', this.state, this.props);
        var show = false, toast = null;
        if (this.state.toast) {
            show = true;
            toast = this.state.toast
        }
        var className = 'app mdl-layout__container ' + this.state.view + '-view'
        return (
            <div className={className}>
                {this._renderActiveView()}
                <Toast toast={toast} type={this.state.toastType} show={show} callback={this._onToastDone}/>;
            </div>
        );
    },

    /**
     * Render active view
     * @returns {*}
     * @private
     */
    _renderActiveView: function() {
        return (
            <span>
                <Content
                    user={this.state.user.user}
                    onNavigationLinkClick={this._onNavigationLinkClick}
                    view={this.state.view}
                    onUsernameChange={this._onUsernameChange}
                    onPasswordChange={this._onPasswordChange}
                    onEmailChange={this._onEmailChange}
                    onFirstNameChange={this._onFirstNameChange}
                    onLastNameChange={this._onLastNameChange}
                    register={this._register}
                    login={this._login}
                    changeView={this._changeView}
                    loginBtnDisabled={this.state.loginBtnDisabled}
                    registerBtnDisabled={this.state.registerBtnDisabled}
                    user={this.state.user}
                    fieldsDisabled={this.state.fieldsDisabled}
                    createNewPasteBtnDisabled={this.state.createNewPasteBtnDisabled}
                    createNew={this._createNew}
                    viewedPaste={this.state.viewedPaste}
                    cmOptions={this.state.cmOptions}
                    onTypeChecked={this._onTypeChecked}
                    onTitleChange={this._onTitleChange}
                    title={this.state.title}
                />
            </span>
        )
    },

    /**
     * On navigation link click
     * @param label
     * @private
     */
    _onNavigationLinkClick: function(label) {
        console.log('Navigate: ', label);
        if (label == 'Pastes') {
            AppStateActions.navigate('pastes');
        } else if (label == 'New') {
            AppStateActions.navigate('new');
        } else if (label == 'Contacts') {
            AppStateActions.navigate('contacts');
        } else if (label == 'Logout') {
            AppStateActions.logout();
        }
    },

    /**
     * On username change
     * @param username
     * @private
     */
    _onUsernameChange: function(username) {
        AppStateActions.setUsername(username);
    },

    /**
     * On password change
     * @param password
     * @private
     */
    _onPasswordChange: function(password) {
        AppStateActions.setPassword(password);
    },

    /**
     * On email change
     * @param email
     * @private
     */
    _onEmailChange: function(email) {
        AppStateActions.setEmail(email);
    },

    /**
     * On first name change
     * @param firstName
     * @private
     */
    _onFirstNameChange: function(firstName) {
        AppStateActions.setFirstName(firstName);
    },

    /**
     * On last name change
     * @param lastName
     * @private
     */
    _onLastNameChange: function(lastName) {
        AppStateActions.setLastName(lastName);
    },

    /**
     * Register
     * @param username
     * @param email
     * @param password
     * @private
     */
    _register: function(username, email, password) {
        AppStateActions.register(username, email, password);
    },

    /**
     * Login
     * @param username
     * @param password
     * @private
     */
    _login: function(username, password) {
        AppStateActions.login(username, password);
    },

    /**
     * Change view
     * @param view
     * @private
     */
    _changeView: function(view) {
        AppStateActions.setView(view);
    },

    /**
     * On toast done
     * @private
     */
    _onToastDone: function() {
        AppStateActions.setToast(false);
    },

    /**
     * Create new
     * @param value
     * @param title
     * @param mode
     * @private
     */
    _createNew: function(value, title, mode) {
        AppStateActions.createNew(value, title, mode);
    },

    /**
     * Set mode
     * @param name
     * @private
     */
    _onTypeChecked: function(name) {
        AppStateActions.setMode(name);
    },

    /**
     * On title change
     * @param title
     * @private
     */
    _onTitleChange: function(title) {
        AppStateActions.changeTitle(title);
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        this.setState(getAppState());
    }
});
