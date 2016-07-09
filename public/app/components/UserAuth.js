var React = require('react');
var ReactPropTypes = React.PropTypes;
var AppStateActions = require('../actions/AppState');
var Button = require('./common/Button');
var Input = require('./common/Input');

var UserAuth = React.createClass({

    propTypes: {
    },

    getInitialState: function() {
        return {
            email: '',
            username: '',
            password: '',
            view: 'login'
        }
    },

    /**
     * @return {object}
     */
    render: function() {
        console.log('User Auth props', this.props);

        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--4-col"></div>
                <div className="mdl-cell mdl-cell--4-col login-form">
                    <div className="card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand">
                            <h2 className="mdl-card__title-text">Welcome to Code Paste</h2>
                        </div>
                        <form className="form" onSubmit={this._onSubmit}>
                            {this._renderActiveView()}
                        </form>
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--4-col"></div>
            </div>
        );
    },

    _renderActiveView: function() {
        var view = null;
        console.log('render active view', this.state.view);
        if (this.state.view == 'login') {
            view =
                <div>
                    <div className="mdl-cell mdl-cell--12-col">
                        {this._renderEmailField()}
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        {this._renderPasswordField()}
                    </div>
                    <div className="mdl-cell mdl-cell--12-col mdl-card__actions mdl-card--border button-wrapper">
                        <div className="mdl-cell mdl-cell--6-col">
                            {this._renderRegistrationButton()}
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                            {this._renderLoginButton()}
                        </div>
                    </div>
                </div>
        } else if (this.state.view == 'registration') {
            view =
                <div className="mdl-cell mdl-cell--12-col">
                    <div className="mdl-cell mdl-cell--12-col">
                        {this._renderUsernameField()}
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        {this._renderEmailField()}
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        {this._renderPasswordField()}
                    </div>
                    <div className="mdl-cell mdl-cell--12-col mdl-card__actions mdl-card--border button-wrapper">
                        <div className="mdl-cell mdl-cell--6-col">
                            {this._renderRegistrationButton(true)}
                        </div>
                        <div className="mdl-cell mdl-cell--6-col">
                            {this._renderLoginViewButton()}
                        </div>
                    </div>
                </div>
        }

        return (view);
    },

    _renderEmailField: function() {
        return (
            <Input
                className="email"
                label="Email"
                floatingLabel={true}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                value={this.state.email}
                type="email"
                onChange={this._onEmailChange}
            />
        )
    },

    _renderUsernameField: function() {
        return (
            <Input
                className="username"
                label="Username"
                value={this.state.username}
                floatingLabel={true}
                type="text"
                onChange={this._onUsernameChange}
            />
        )
    },

    _renderPasswordField: function() {
        return (
            <Input
                className="password"
                label="Password"
                floatingLabel={true}
                pattern=""
                value={this.state.password}
                type="password"
                onChange={this._onPasswordChange}
            />
        )
    },

    _renderRegisterButton: function(primary) {
        return (
            <Button
                className="button"
                label="Register"
                raised={true}
                primary={primary}
                rippleEffect={true}
                onClick={this._register}
            />
        )
    },

    _renderLoginButton: function() {
        return (
            <Button
                className="button"
                label="Login"
                raised={true}
                primary={true}
                rippleEffect={true}
                onClick={this._login}
            />
        )
    },

    _renderRegistrationButton: function(isPrimary) {
        return (
            <Button
                className="button"
                label="Register"
                raised={true}
                primary={isPrimary}
                rippleEffect={true}
                onClick={this._changeView.bind(this, 'registration')}
            />
        )
    },

    _renderLoginViewButton: function() {
        return (
            <Button
                className="button"
                label="Login"
                raised={true}
                rippleEffect={true}
                onClick={this._changeView.bind(this, 'login')}
            />
        )
    },

    _onEmailChange: function(event) {
        console.log('_onEmailChange', event.target.value);
        this.setState({email: event.target.value});
    },

    _onPasswordChange: function(event) {
        console.log('_onPasswordChange', event.target.value);
        this.setState({password: event.target.value});
    },

    _onUsernameChange: function(event) {
        console.log('_onUsernameChange', event.target.value);
        this.setState({username: event.target.value});
    },
    
    _login: function () {
        console.log('login');
    },
    
    _register: function () {
        console.log('register');
        AppStateActions.register();
    },

    _onSubmit: function (event) {
        event.preventDefault();
        event.stopPropagation();
    },

    _changeView: function(view) {
        this.setState({view: view});
    }

});

module.exports = UserAuth;
