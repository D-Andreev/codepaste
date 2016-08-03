var React = require('react');
var ReactPropTypes = React.PropTypes;
var Button = require('./common/Button');
var Input = require('./common/Input');
var Textarea = require('./common/Textarea');

var Contacts = React.createClass({

    propTypes: {
        sendMessage: ReactPropTypes.func,
        title: ReactPropTypes.string,
        content: ReactPropTypes.string,
        user: ReactPropTypes.object,
        fieldsDisabled: ReactPropTypes.bool,
        sendBtnDisabled: ReactPropTypes.bool,
        onContentChange: ReactPropTypes.func,
        onTitleChange: ReactPropTypes.func
    },

    /**
     * @return {object}
     */
    render: function() {
        var className = 'mdl-grid';
        if (this.props.hidden) className += ' hidden';
        return (
            <div className={className}>
                <div className="mdl-cell mdl-cell--2-col"></div>
                <div className="mdl-cell mdl-cell--8-col login-form">
                    <div className="card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand">
                            <h2 className="mdl-card__title-text">Contact Us</h2>
                        </div>
                        {this._renderContactUsView()}
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
    _renderTitleField: function() {
        return (
            <Input
                id="title"
                className="title"
                label="Title"
                floatingLabel={true}
                onChange={this._onTitleChange}
                value={this.props.title}
                disabled={this.props.fieldsDisabled}
                type="text"
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
            <Textarea
                id="content"
                className="content"
                label="Content"
                onChange={this._onContentChange}
                value={this.props.content}
                floatingLabel={true}
                disabled={this.props.fieldsDisabled}
                rows={10}
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
                label="Send message"
                raised={true}
                rippleEffect={true}
                primary={true}
                onClick={this._send}
                disabled={this.props.sendBtnDisabled}
            />
        )
    },

    /**
     * On title change
     * @param e
     * @private
     */
    _onTitleChange: function (e) {
        this.props.onTitleChange(e.target.value);
    },

    /**
     * On content change
     * @param e
     * @private
     */
    _onContentChange: function (e) {
        this.props.onContentChange(e.target.value);
    },

    /**
     * Send
     * @private
     */
    _send: function () {
        this.props.sendMessage();
    }
});

module.exports = Contacts;
