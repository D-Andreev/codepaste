var React = require('react');
var ReactPropTypes = React.PropTypes;
var Radio = require('./common/Radio');
var Input = require('./common/Input');
var Button = require('./common/Button');

var Editor = React.createClass({

    propTypes: {
        createNewPasteBtnDisabled: ReactPropTypes.bool,
        createNew: ReactPropTypes.func
    },

    _cm: null,

    /**
     * Get Initial state
     * @returns {{options: {lineNumbers: boolean, mode: {name: string}, theme: string, extraKeys: {Ctrl-Space: string}, matchBrackets: boolean, closeBrackets: boolean, closeTag: boolean, continueList: boolean}, value: string, javascriptChecked: boolean, htmlChecked: boolean, sqlChecked: boolean, cSharpChecked: boolean, cssChecked: boolean, title: string}}
     */
    getInitialState: function() {
        return {
            options: {
                lineNumbers: true,
                mode: {
                    name: 'javascript'
                },
                theme: 'material',
                extraKeys: {
                    'Ctrl-Space': 'autocomplete'
                },
                matchBrackets: true,
                closeBrackets: true,
                closeTag: true,
                continueList: true
            },
            value: '',
            javascriptChecked: true,
            htmlChecked: false,
            sqlChecked: false,
            cSharpChecked: false,
            cssChecked: false,
            title: ''
        }
    },

    /**
     * Component did mount
     */
    componentDidMount: function() {
        this._cm = CodeMirror.fromTextArea(document.getElementById('code'), this.state.options);
    },

    /**
     * @return {object}
     */
    render: function() {
        console.log('Editor', this.state);
        return (
            <div className="mdl-grid">
                <div className="mdl-cell mdl-cell--2-col"></div>
                <div className="mdl-cell mdl-cell--8-col">
                    <div className="mdl-cell mdl-cell--12-col">
                        <Input
                            value={this.state.title}
                            onChange={this._onTitleChange}
                            floatingLabel={true}
                            type="text"
                            label="Title"
                        />
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        <Radio
                            name='code'
                            label='Javascript'
                            value="javascript"
                            checked={this.state.javascriptChecked}
                            onCheck={this._onCheck}
                        />
                        <Radio
                            name='code'
                            label='HTML'
                            onCheck={this._onCheck}
                            checked={this.state.htmlChecked}
                            value="text/html"
                        />
                        <Radio
                            name='code'
                            label='SQL'
                            onCheck={this._onCheck}
                            checked={this.state.sqlChecked}
                            value="text/x-sql"
                        />
                        <Radio
                            name='code'
                            label='CSS'
                            onCheck={this._onCheck}
                            checked={this.state.cssChecked}
                            value="text/css"
                        />
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        <textarea id="code">

                    </textarea>
                    </div>
                    <div className="mdl-cell mdl-cell--12-col">
                        <Button
                            label="Create New Paste"
                            raised={true}
                            disabled={this.props.createNewPasteBtnDisabled}
                            primary={true}
                            rippleEffect={true}
                            onClick={this._createNewPaste}
                        />
                    </div>
                </div>

                <div className="mdl-cell mdl-cell--2-col"></div>
            </div>
        )
    },

    /**
     * On radio check
     * @param name
     * @private
     */
    _onCheck: function(name) {
        if (name == 'javascript') {
            this.setState({
                javascriptChecked: true,
                htmlChecked: false,
                sqlChecked: false,
                cssChecked: false,
                cSharpChecked: false
            });
        } else if (name == 'text/html') {
            this.setState({
                htmlChecked: true,
                javascriptChecked: false,
                sqlChecked: false,
                cssChecked: false,
                cSharpChecked: false
            });
        } else if (name == 'text/x-sql') {
            this.setState({
                sqlChecked: true,
                htmlChecked: false,
                javascriptChecked: false,
                cssChecked: false,
                cSharpChecked: false
            });
        } else if (name == 'text/css') {
            this.setState({
                cssChecked: true,
                sqlChecked: false,
                htmlChecked: false,
                javascriptChecked: false,
                cSharpChecked: false
            });
        }
        var opts = this.state.options;
        opts.mode.name = name;
        this.setState({options: opts});
    },

    /**
     * On title change
     * @param e
     * @private
     */
    _onTitleChange: function (e) {
        this.setState({title: e.target.value});
    },

    /**
     * Create new paste
     * @private
     */
    _createNewPaste: function() {
        var value = this._cm.getValue();
        console.log('create new', value, this.state);
        this.props.createNew(value, this.state.title, this.state.options.mode.name);
    }
});

module.exports = Editor;
