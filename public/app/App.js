var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppStateActions = require('./actions/AppState');
var AppStateStore = require('./stores/AppStateStore');
var UserAuth = require('./components/UserAuth');
var Toast = require('./components/common/Toast');

/**
 * Retrieve the current data from store
 */
function getAppState() {
    return {
        url: AppStateStore.getUrl(),
        view: AppStateStore.getView(),
        toast: AppStateStore.getToast(),
        loginBtnDisabled: AppStateStore.getLoginBtnDisabled(),
        registerBtnDisabled: AppStateStore.getRegisterBtnDisabled(),
        user: AppStateStore.getUser()
    };
}

module.exports = React.createClass({
    propTypes: {
        view: ReactPropTypes.string.isRequired,
        url: ReactPropTypes.string.isRequired
    },

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

    componentDidMount: function() {
        AppStateStore.addChangeListener(this._onChange);
        console.log('props', this.props);
        AppStateActions.init(this.props);
    },

    componentWillUnmount: function() {
        AppStateStore.removeChangeListener(this._onChange);
    },

    render: function() {
        console.log('state', this.state);
        var show = false, toast = null;
        if (this.state.toast) {
            show = true;
            toast = this.state.toast
        }
        console.log('showToast', show, toast);
        return (
            <div className="app">
                <UserAuth
                    onUsernameChange={this._onUsernameChange}
                    onPasswordChange={this._onPasswordChange}
                    onEmailChange={this._onEmailChange}
                    register={this._register}
                    login={this._login}
                    view={this.state.view}
                    changeView={this._changeView}
                    loginBtnDisabled={this.state.loginBtnDisabled}
                    registerBtnDisabled={this.state.registerBtnDisabled}
                    user={this.state.user}
                />
                <Toast toast={toast} show={show} callback={this._onToastDone}/>;
            </div>
        );
    },

    _onUsernameChange: function(username) {
        AppStateActions.setUsername(username);
    },

    _onPasswordChange: function(password) {
        AppStateActions.setPassword(password);
    },

    _onEmailChange: function(email) {
        AppStateActions.setEmail(email);
    },

    _register: function(username, email, password) {
        console.log('asd', username, email, password);
        console.log('APP register', this.state);
        AppStateActions.register(username, email, password);
    },

    _login: function() {
        console.log('APP login', this.state);
        AppStateActions.login();
    },

    _changeView: function(view) {
        AppStateActions.setView(view);
    },

    _onToastDone: function() {
        AppStateActions.setToast(false);
    },

    /**
     * Event handler for 'change' events coming from the TodoStore
     */
    _onChange: function() {
        console.log('OnChange');
        this.setState(getAppState());
    }
});
