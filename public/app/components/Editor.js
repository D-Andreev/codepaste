var React = require('react');
var moment = require('moment');
var ReactPropTypes = React.PropTypes;
var Radio = require('./common/Radio');
var Input = require('./common/Input');
var Button = require('./common/Button');
var List = require('./common/List');
var Icon = require('./common/Icon');

var Editor = React.createClass({

    propTypes: {
        createNewPasteBtnDisabled: ReactPropTypes.bool,
        createNew: ReactPropTypes.func,
        hidden: ReactPropTypes.bool,
        readOnly: ReactPropTypes.bool,
        viewedPaste: ReactPropTypes.object,
        cmOptions: ReactPropTypes.object,
        onTypeChecked: ReactPropTypes.func,
        onTitleChange: ReactPropTypes.func,
        title: ReactPropTypes.string,
        view: ReactPropTypes.string,
        showToast: ReactPropTypes.func
    },

    _cm: null,

    /**
     * Get Initial state
     * @returns {{copyValue: string}}
     */
    getInitialState: function() {
        return {
            copyValue: ''
        }
    },

    _setValue: function (value) {
        this._cm.setValue(value);
        var $this = this;
        setTimeout(function() {
            $this._cm.refresh();
        },1);
    },

    getDefaultProps: function() {
        return {
            cmOptions: {
                lineNumbers: true,
                readOnly: false,
                mode: {
                    name: 'javascript'
                },
                theme: 'pastel-on-dark',
                extraKeys: {
                    'Ctrl-Space': 'autocomplete'
                },
                matchBrackets: true,
                closeBrackets: true,
                closeTag: true,
                continueList: true,
                indentWithTabs: true,
                lineWrapping: true
            }

        }
    },

    /**
     * Component Will Update
     * @param nextProps
     */
    componentWillUpdate: function(nextProps) {
        if (this._cm) {
            if (this.props.view != nextProps.view && nextProps.view == 'new') {
                this._cm.setValue('');
                this._cm.clearHistory();
            }
            this._cm.setOption('readOnly', nextProps.cmOptions.readOnly);
            var $this = this;
            setTimeout(function() {
                $this._cm.refresh();
            },1);
            if (nextProps.view == 'paste' && nextProps.viewedPaste) {
                if(!this.props.viewedPaste || this.props.viewedPaste.code != nextProps.viewedPaste.code) {
                    this._setValue(nextProps.viewedPaste.code);
                }
            }
        }
    },

    /**
     * Component did mount
     */
    componentDidMount: function() {
        var $this = this;
        // eslint-disable-next-line no-undef
        this._cm = CodeMirror.fromTextArea(document.getElementById('code'), this.props.cmOptions);
        this._cm.on('change', function() {
            $this.setState({copyValue: $this._cm.getValue()})
        });
        // eslint-disable-next-line no-undef
        this._client = new ZeroClipboard( document.getElementById("copy-button") );


        this._client.on("ready", function() {
            $this._client.on("aftercopy", function() {
                alert('Copied!');
            });
        } );
    },

    /**
     * Render
     * @returns {XML}
     */
    render: function() {
        var className = 'mdl-grid';
        if (this.props.hidden) className += ' hidden';
        return (
            <div className={className}>
                <div className="mdl-cell mdl-cell--12-col">
                    <div className="card mdl-cell mdl-cell--12-col mdl-card mdl-shadow--2dp">
                        <div className="mdl-card__title mdl-card--expand view-title-wrapper">
                            <h2 className="mdl-card__title-text view-title">{this._getTitle()}</h2>
                        </div>
                        <div className="mdl-cell mdl-cell--12-col ">
                            {this._renderTopSection()}
                        </div>
                        {this._renderTypes()}
                        <div className="mdl-cell mdl-cell--12-col">
                            <textarea id="code">

                            </textarea>
                        </div>
                        {this._renderCreateNewButton()}
                    </div>
                </div>
            </div>
        )
    },

    /**
     * Get Title
     * @returns {*}
     * @private
     */
    _getTitle: function () {
        var title = this.props.view;
        if (title == 'paste') title = this.props.title || title;
        return title;
    },

    /**
     * Render top secion
     * @returns {XML}
     * @private
     */
    _renderTopSection: function() {
        var inputHidden = false;
        var listHidden = true;
        var items = [];
        if (this.props.view == 'paste') {
            inputHidden = true;
            listHidden = false;
            var date = moment(this.props.viewedPaste.created).format('MMMM Do YYYY, h:mm:ss a');
            items = [
                {label: this.props.viewedPaste.user.username, icon: 'account_circle'},
                {label: this.props.viewedPaste.mode, icon: 'code'},
                {label: date, icon: 'schedule'}
            ]
        }

        return (
            <span>
                <Input
                    hidden={inputHidden}
                    value={this.props.title}
                    onChange={this._onTitleChange}
                    floatingLabel={true}
                    type="text"
                    pattern="(.)+"
                    maxLength="20"
                    label="Title"
                />
                <List
                    hidden={listHidden}
                    items={items}
                />
                <Icon
                    id='copy-button'
                    className="copy-button"
                    onClick={this._onCopy}
                    icon="content_copy"
                    text={this.state.copyValue}
                    hidden={listHidden}
                    title="Copy"
                />
            </span>
        )
    },

    /**
     * Render Types
     * @returns {XML}
     * @private
     */
    _renderTypes: function () {
        var className = 'mdl-cell mdl-cell--12-col';
        var mode = 'javascript';
        var readOnly = false;
        if (this.props.view == 'paste') {
            className += ' hidden';
            mode = this.props.cmOptions.mode;
            readOnly = true;
        } else if (this.props.view == 'new') {
            mode = this.props.cmOptions.mode;
        }

        return (
            <div className={className}>
                <Radio
                    name='code'
                    label='Javascript'
                    value="javascript"
                    checked={mode == 'javascript'}
                    onCheck={this._onCheck}
                    disabled={readOnly}
                />
                <Radio
                    name='code'
                    label='HTML'
                    onCheck={this._onCheck}
                    checked={mode == 'text/html'}
                    value="text/html"
                    disabled={readOnly}
                />
                <Radio
                    name='code'
                    label='SQL'
                    onCheck={this._onCheck}
                    checked={mode == 'text/x-sql'}
                    value="text/x-sql"
                    disabled={readOnly}
                />
                <Radio
                    name='code'
                    label='CSS'
                    onCheck={this._onCheck}
                    checked={mode == 'text/css'}
                    value="text/css"
                    disabled={readOnly}
                />
            </div>
        )
    },

    /**
     * Render Create new button
     * @returns {XML}
     * @private
     */
    _renderCreateNewButton: function() {
        var className = 'mdl-cell mdl-cell--12-col';
        if (this.props.view == 'paste') className += ' hidden';
        return (
            <div className={className}>
                <Button
                    label="Create New Paste"
                    raised={true}
                    disabled={this.props.createNewPasteBtnDisabled}
                    primary={true}
                    rippleEffect={true}
                    onClick={this._createNewPaste}
                />
            </div>
        )
    },

    /**
     * On radio check
     * @param name
     * @private
     */
    _onCheck: function(name) {
        this.props.onTypeChecked(name);
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
     * Create new paste
     * @private
     */
    _createNewPaste: function() {
        var value = this._cm.getValue();
        this.props.createNew(value, this.props.title, this.props.cmOptions.mode);
    }
});

module.exports = Editor;
