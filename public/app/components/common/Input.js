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
        errorMessage: ReactPropTypes.string,
        expandable: ReactPropTypes.bool,
        expandableHolder: ReactPropTypes.bool,
        isInvalid: ReactPropTypes.bool,
        pattern: ReactPropTypes.string,
        placeholder: ReactPropTypes.string,
        hidden: ReactPropTypes.bool,
        autoFocus: ReactPropTypes.bool,
        disabled: ReactPropTypes.bool,
        value: ReactPropTypes.string,
        label: ReactPropTypes.string
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
     * Get Initial state
     * @returns {{value: *}}
     */
    getInitialState: function() {
        return {
            value: this.props.value
        }
    },

    /**
     * Component will update
     * @param nextProps
     */
    componentWillUpdate: function(nextProps) {
        if (nextProps.value != this.state.value) {
            this.setState({value: nextProps.value});
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
                    disabled={this.props.disabled}
                    pattern={this.props.pattern}
                    placeholder={this.props.placeholder}
                    value={this.state.value}
                    onChange={this._onChange}
                >
                </input>
                <label className="mdl-textfield__label" htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <span className="mdl-textfield__error">{this.props.errorMessage}</span>
            </div>
        );
    },

    /**
     * On change
     * @param event
     * @private
     */
    _onChange: function(event) {
        this.props.onChange(event);
        this.setState({value: event.target.value});
    }
});

module.exports = Input;
