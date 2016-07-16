    var React = require('react');
var Button = require('./common/Button');
var Input = require('./common/Input');

var ContactUs = React.createClass({

    /**
     * @return {object}
     */
    render: function() {

        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--2-col"></div>
                <div className="mdl-cell mdl-cell--8-col login-form">
                    <div className="card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand">
                            <h2 className="mdl-card__title-text">Contact Us</h2>
                        </div>
                    </div>
                </div>
                <div className="mdl-cell mdl-cell--2-col"></div>
            </div>
        );
    },

    /**
     * Render login fields
     * @returns {XML}
     * @private
     */
    _renderContactUsView: function() {
        return (
            <div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderEmailField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderTitleField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col">
                    {this._renderContentField()}
                </div>
                <div className="mdl-cell mdl-cell--12-col mdl-card__actions mdl-card--border button-wrapper">
                    <div className="mdl-cell mdl-cell--6-col"></div>
                    <div className="mdl-cell mdl-cell--6-col">
                        {this._renderSendButton()}
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
        return (
            <Input
                id="email"
                className="email"
                label="Email"
                floatingLabel={true}
                value={this.props.user.email}
                disabled={this.props.fieldsDisabled}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                type="text"
                errorMessage="Please enter a valid email"
            />
        )
    },

    /**
     * Render email field
     * @returns {XML}
     * @private
     */
    _renderTitleField: function() {
        return (
            <Input
                id="title"
                className="title"
                label="Title"
                floatingLabel={true}
                value={this.props.user.email}
                disabled={this.props.fieldsDisabled}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                type="text"
                errorMessage="Please enter a valid title"
            />
        )
    },

    /**
     * Render content field
     * @returns {XML}
     * @private
     */
    _renderContentField: function() {
        return (
            <Input
                id="content"
                className="content"
                label="Content"
                floatingLabel={true}
                disabled={this.props.fieldsDisabled}
                pattern="[^@]+@[^@]+\.[a-zA-Z]{2,}"
                type="text"
                errorMessage="Please enter a valid content"
            />
        )
    },

    /**
     * Render send button
     * @returns {XML}
     * @private
     */
    _renderSendButton: function() {
        return (
            <Button
                className="button"
                label="Send"
                raised={true}
                rippleEffect={true}
                onClick={this._send}
            />
        )
    },

    /**
     * Send
     * @private
     */
    _send: function () {
        //TODO: add send functionality
    }
});

module.exports = ContactUs;
