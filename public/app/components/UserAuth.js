var React = require('react');
var Button = require('./common/Button');
var Input = require('./common/Input');

var UserAuth = React.createClass({
    getInitialState: function() {
        return {
            
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
        console.log('render active view', this.props.view);
        if (this.props.view == 'login') {
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
        } else if (this.props.view == 'registration') {
            view =
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

    _renderEmailField: function() {
        return (
            <Input
                id="email"
                className="email"
                label="Email"
                floatingLabel={true}
                value={this.props.user.email}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                type="email"
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
                value={this.props.user.username}
                floatingLabel={true}
                pattern="^.+$"
                type="text"
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
                pattern="^.+$"
                value={this.props.user.password}
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
                disabled={this.props.registerBtnDisabled}
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
                disabled={this.props.loginBtnDisabled}
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
        var user = this.props.user;
        user.email = event.target.value;
        this.setState({user: user});
    },

    _onPasswordChange: function(event) {
        console.log('_onPasswordChange', event.target.value);
        var user = this.props.user;
        user.password = event.target.value;
        this.setState({user: user});
    },

    _onUsernameChange: function(event) {
        console.log('_onUsernameChange', event.target.value);
        var user = this.props.user;
        user.username = event.target.value;
        this.setState({user: user});
    },
    
    _login: function () {
        console.log('login');
    },
    
    _register: function () {
        console.log('USER AUTH register', this.props.user);
        this.props.register(this.props.user.username, this.props.user.email, this.props.user.password);
    },

    _changeView: function(view) {
        this.props.changeView(view);
    }

});

module.exports = UserAuth;
