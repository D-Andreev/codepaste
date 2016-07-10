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
        toastType: AppStateStore.getToastType(),
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
        AppStateActions.init(this.props);
    },

    componentWillUnmount: function() {
        AppStateStore.removeChangeListener(this._onChange);
    },

    render: function() {
        console.log('App State', this.state);
        console.log('App Props', this.props);
        var show = false, toast = null;
        if (this.state.toast) {
            show = true;
            toast = this.state.toast
        }
        return (
            <div className="app">
                {this._renderActiveView()}
                <Toast toast={toast} type={this.state.toastType} show={show} callback={this._onToastDone}/>;
            </div>
        );
    },

    _renderActiveView: function() {
        var view = null;
        if (this.state.view == 'app') {
            view =
                <div>THE APP</div>
        } else {
            view =
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
        }

        return view;
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
        console.log('APP register', this.state, username, email, password);
        AppStateActions.register(username, email, password);
    },

    _login: function(username, password) {
        console.log('APP login', this.state, username, password);
        AppStateActions.login(username, password);
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
        this.setState(getAppState());
    }
});
