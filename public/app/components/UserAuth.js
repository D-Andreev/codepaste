var React = require('react');
var Button = require('./common/Button');
var Input = require('./common/Input');

var UserAuth = React.createClass({

    /**
     * @return {object}
     */
    render: function() {
        console.log('UserAuth State', this.state);
        console.log('UserAuth Props', this.props);

        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--4-col"></div>
                <div className="mdl-cell mdl-cell--4-col login-form">
                    <div className="card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand">
                            <h2 className="mdl-card__title-text">{this._getTitle()}</h2>
                        </div>
                        {this._renderActiveView()}
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--4-col"></div>
            </div>
        );
    },

    _renderActiveView: function() {
        var view = null;
        if (this.props.view == 'login') {
            view = this._renderLoginFields();
        } else if (this.props.view == 'registration') {
            view = this._renderRegisterFields();
        }

        return (view);
    },

    _getTitle: function() {
        if (this.props.view == 'login') {
            return 'Welcome to Code paste'
        } else if (this.props.view == 'registration') {
            return 'Register'
        }
    },

    _renderLoginFields: function() {
        return (
            <div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderUsernameField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderPasswordField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderEmailField()}
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
        )
    },

    _renderRegisterFields: function() {
        return (
            <div>
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
                        {this._renderRegisterButton(true)}
                    </div>
                    <div className="mdl-cell mdl-cell--6-col">
                        {this._renderLoginViewButton()}
                    </div>
                </div>
            </div>
        )
    },

    _renderEmailField: function() {
        var hidden = true;
        if (this.props.view == 'registration') hidden = false;
        return (
            <Input
                id="email"
                className="email"
                label="Email"
                floatingLabel={true}
                hidden={hidden}
                value={this.props.user.email}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                type="text"
                errorMessage="Please enter a valid email"
                onChange={this._onEmailChange}
            />
        )
    },

    _renderUsernameField: function() {
        return (
            <Input
                id="username"
                className="username"
                label="Username"
                autoFocus={true}
                value={this.props.user.username}
                floatingLabel={true}
                pattern="\w{4,}"
                type="text"
                errorMessage="Please enter a valid username"
                onChange={this._onUsernameChange}
            />
        )
    },

    _renderPasswordField: function() {
        return (
            <Input
                id="password"
                className="password"
                label="Password"
                floatingLabel={true}
                pattern="\w{4,}"
                value={this.props.user.password}
                type="password"
                errorMessage="Please enter a valid password"
                onChange={this._onPasswordChange}
            />
        )
    },

    _renderRegisterButton: function(accent) {
        return (
            <Button
                className="button"
                label="Register"
                raised={true}
                disabled={this.props.registerBtnDisabled}
                accent={accent}
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
                disabled={this.props.loginBtnDisabled}
                accent={true}
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
        this.props.onEmailChange(event.target.value);
    },

    _onPasswordChange: function(event) {
        this.props.onPasswordChange(event.target.value);
    },

    _onUsernameChange: function(event) {
        this.props.onUsernameChange(event.target.value);
    },
    
    _login: function () {
        this.props.login(this.props.user.username, this.props.user.password);
    },
    
    _register: function () {
        this.props.register(this.props.user.username, this.props.user.email, this.props.user.password);
    },

    _changeView: function(view) {
        this.props.changeView(view);
    }

});

module.exports = UserAuth;
