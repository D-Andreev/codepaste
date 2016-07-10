var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Input = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        onClick: ReactPropTypes.func,
        onChange: ReactPropTypes.func,
        type: ReactPropTypes.string.isRequired,
        floatingLabel: ReactPropTypes.bool,
        error: ReactPropTypes.bool,
        expandable: ReactPropTypes.bool,
        expandableHolder: ReactPropTypes.bool,
        isInvalid: ReactPropTypes.bool,
        autoFocus: ReactPropTypes.bool,
        pattern: ReactPropTypes.string,
        placeholder: ReactPropTypes.string

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
                'mdl-textfield--floating-label': $this.props.floatingLabel,
                'mdl-textfield__error': $this.props.error,
                'mdl-textfield--expandable': $this.props.expandable,
                'mdl-input__expandable-holder': $this.props.expandableHolder,
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
                    pattern={this.props.pattern}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    onChange={this.props.onChange}
                >
                </input>
                <label className="mdl-textfield__label" for={this.props.id}>
                    {this.props.label}
                </label>
                <span class="mdl-textfield__error">{this.props.error}</span>
            </div>
        );
    }
});

module.exports = Input;
