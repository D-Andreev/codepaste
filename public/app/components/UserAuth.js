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
        var className = 'mdl-grid';
        if (this.props.hidden) className += ' hidden';
        return (
            <div className={className}>
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

    /**
     * Render active view
     * @returns {*}
     * @private
     */
    _renderActiveView: function() {
        var view = null;
        if (this.props.view == 'login') {
            view = this._renderLoginFields();
        } else if (this.props.view == 'registration') {
            view = this._renderRegisterFields();
        }

        return (view);
    },

    /**
     * Get title
     * @returns {*}
     * @private
     */
    _getTitle: function() {
        if (this.props.view == 'login') {
            return 'Welcome to Code paste'
        } else if (this.props.view == 'registration') {
            return 'Register'
        }
    },

    /**
     * Render login fields
     * @returns {XML}
     * @private
     */
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
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderFirstNameField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderLastNameField()}
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

    /**
     * Render register fields
     * @returns {XML}
     * @private
     */
    _renderRegisterFields: function() {
        return (
            <div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderUsernameField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderPasswordField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderFirstNameField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderLastNameField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderEmailField()}
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

    /**
     * Render email field
     * @returns {XML}
     * @private
     */
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
                disabled={this.props.fieldsDisabled}
                value={this.props.user.email}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                type="text"
                errorMessage="Please enter a valid email"
                onChange={this._onEmailChange}
            />
        )
    },

    /**
     * Render username field
     * @returns {XML}
     * @private
     */
    _renderUsernameField: function() {
        return (
            <Input
                id="username"
                className="username"
                label="Username"
                autoFocus={true}
                disabled={this.props.fieldsDisabled}
                value={this.props.user.username}
                floatingLabel={true}
                pattern="\w{4,}"
                type="text"
                errorMessage="Please enter a valid username"
                onChange={this._onUsernameChange}
            />
        )
    },

    /**
     * Render first name field
     * @returns {XML}
     * @private
     */
    _renderFirstNameField: function() {
        var hidden = true;
        if (this.props.view == 'registration') hidden = false;
        return (
            <Input
                id="first-name"
                className="first-name"
                disabled={this.props.fieldsDisabled}
                label="First name"
                hidden={hidden}
                value={this.props.user.firstName}
                floatingLabel={true}
                type="text"
                pattern="^.+$"
                errorMessage="Please enter a valid first name"
                onChange={this._onFirstNameChange}
            />
        )
    },

    /**
     * Render last name field
     * @returns {XML}
     * @private
     */
    _renderLastNameField: function() {
        var hidden = true;
        if (this.props.view == 'registration') hidden = false;
        return (
            <Input
                id="last-name"
                className="last-name"
                hidden={hidden}
                disabled={this.props.fieldsDisabled}
                label="Last name"
                pattern="^.+$"
                value={this.props.user.lastName}
                floatingLabel={true}
                type="text"
                errorMessage="Please enter a valid last name"
                onChange={this._onLastNameChange}
            />
        )
    },

    /**
     * Render password field
     * @returns {XML}
     * @private
     */
    _renderPasswordField: function() {
        return (
            <Input
                id="password"
                className="password"
                label="Password"
                floatingLabel={true}
                pattern="\w{4,}"
                disabled={this.props.fieldsDisabled}
                value={this.props.user.password}
                type="password"
                errorMessage="Please enter a valid password"
                onChange={this._onPasswordChange}
            />
        )
    },

    /**
     * Render register button
     * @param primary
     * @returns {XML}
     * @private
     */
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

    /**
     * Render login button
     * @returns {XML}
     * @private
     */
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

    /**
     * Render registration button
     * @param isPrimary
     * @returns {XML}
     * @private
     */
    _renderRegistrationButton: function(isPrimary) {
        return (
            <Button
                className="button"
                label="Register"
                accent={true}
                raised={true}
                primary={isPrimary}
                rippleEffect={true}
                onClick={this._changeView.bind(this, 'registration')}
            />
        )
    },

    /**
     * Render login view button
     * @returns {XML}
     * @private
     */
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

    /**
     * On email changed
     * @param event
     * @private
     */
    _onEmailChange: function(event) {
        this.props.onEmailChange(event.target.value);
    },

    /**
     * On password change
     * @param event
     * @private
     */
    _onPasswordChange: function(event) {
        this.props.onPasswordChange(event.target.value);
    },

    /**
     * On username change
     * @param event
     * @private
     */
    _onUsernameChange: function(event) {
        this.props.onUsernameChange(event.target.value);
    },

    /**
     * On first name change
     * @param event
     * @private
     */
    _onFirstNameChange: function(event) {
        this.props.onFirstNameChange(event.target.value);
    },

    /**
     * On last name change
     * @param event
     * @private
     */
    _onLastNameChange: function(event) {
        this.props.onLastNameChange(event.target.value);
    },

    /**
     * Login
     * @private
     */
    _login: function () {
        this.props.login(this.props.user.username, this.props.user.password);
    },

    /**
     * Register
     * @private
     */
    _register: function () {
        this.props.register(this.props.user.username, this.props.user.email, this.props.user.password);
    },

    /**
     * Change view
     * @param view
     * @private
     */
    _changeView: function(view) {
        this.props.changeView(view);
    }

});

module.exports = UserAuth;
