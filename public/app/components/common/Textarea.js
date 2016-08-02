var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Textarea = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        onClick: ReactPropTypes.func,
        onChange: ReactPropTypes.func,
        floatingLabel: ReactPropTypes.bool,
        disabled: ReactPropTypes.bool,
        rows: ReactPropTypes.number
    },

    /**
     * @return {object}
     */
    render: function() {
        var wrapperClassName = classnames(
            'mdl-textfield',
            'mdl-js-textfield',
            {
                'hidden': this.props.hidden,
                'mdl-textfield--floating-label': this.props.floatingLabel
            });
        var textareaClassName = classnames(
            'mdl-textfield__input',
            this.props.className);
        return (
            <div className={wrapperClassName}>
                <textarea
                    id={this.props.id}
                    className={textareaClassName}
                    onClick={this.props.onClick}
                    onChange={this.props.onChange}
                    disabled={this.props.disabled}
                    rows={this.props.rows}
                >
                </textarea>
                <label className="mdl-textfield__label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
            </div>
        );
    }
});

module.exports = Textarea;
