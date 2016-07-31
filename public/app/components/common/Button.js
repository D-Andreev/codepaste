var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Button = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        label: ReactPropTypes.string,
        onClick: ReactPropTypes.func,
        raised: ReactPropTypes.bool,
        fab: ReactPropTypes.bool,
        miniFab: ReactPropTypes.bool,
        icon: ReactPropTypes.string,
        colored: ReactPropTypes.bool,
        primary: ReactPropTypes.bool,
        accent: ReactPropTypes.bool,
        rippleEffect: ReactPropTypes.bool,
        disabled: ReactPropTypes.bool
    },

    /**
     * @return {object}
     */
    render: function() {
        var className = classnames(this.props.className, {
            'mdl-button': true,
            'mdl-js-button': true,
            'mdl-button--raised': this.props.raised,
            'mdl-button--fab': this.props.fab,
            'mdl-button--mini-fab': this.props.miniFab,
            'mdl-button--icon': this.props.icon,
            'mdl-button--colored': this.props.colored,
            'mdl-button--primary': this.props.primary,
            'mdl-button--accent': this.props.accent,
            'mdl-js-ripple-effect': this.props.rippleEffect
        });
        var label = this.props.label;
        if (this.props.icon) label = <i className="material-icons">{this.props.icon}</i>;
        return (
            <button
                id={this.props.id}
                className={className}
                disabled={this.props.disabled}
                onClick={this.props.onClick}>
                {label}
            </button>
        );
    }
});

module.exports = Button;
