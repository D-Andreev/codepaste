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
        errorMessage: ReactPropTypes.string,
        isInvalid: ReactPropTypes.bool,
        pattern: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        hidden: ReactPropTypes.bool,
        autoFocus: ReactPropTypes.bool,
        disabled: ReactPropTypes.bool,
        rows: ReactPropTypes.number
    },

    /**
     * Get default props
     * @returns {{autoFocus: boolean}}
     */
    getDefaultProps: function() {
        return {
            autoFocus: false
        }
    },

    /**
     * @return {object}
     */
    render: function() {
        var $this = this;
        var wrapperClassName = classnames(
            'mdl-textfield',
            'mdl-js-textfield',
            {
                'hidden': $this.props.hidden,
                'mdl-textfield--floating-label': $this.props.floatingLabel,
                'mdl-textfield__error': $this.props.error,
                'is-invalid': $this.props.isInvalid
            });
        var inputClassName = classnames(
            'mdl-textfield__input',
            this.props.className);
        return (
            <div className={wrapperClassName}>
                <input
                    id={this.props.id}
                    className={inputClassName}
                    onClick={this.props.onClick}
                    autoFocus={this.props.autoFocus}
                    type={this.props.type}
                    disabled={this.props.disabled}
                    pattern={this.props.pattern}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    rows={this.props.rows}
                >
                </input>
                <label className="mdl-textfield__label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <span className="mdl-textfield__error">{this.props.errorMessage}</span>
            </div>
        );
    }
});

module.exports = Textarea;
