var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Icon = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        id: ReactPropTypes.string,
        icon: ReactPropTypes.string,
        onClick: ReactPropTypes.func,
        text: ReactPropTypes.string,
        hidden: ReactPropTypes.bool,
        wrapperClassName: ReactPropTypes.string
    },

    /**
     * Get default props
     * @returns {{wrapperClassName: string}}
     */
    getDefaultProps: function() {
        return {
            wrapperClassName: ''
        }
    },

    /**
     * @return {object}
     */
    render: function() {
        var classes = {};
        classes[this.props.className] = this.props.className;
        classes.hidden = this.props.hidden;
        var className = classnames("material-icons mdl-list__item-icon", classes);
        return (
            <span className={this.props.wrapperClassName}>
                <i
                    id={this.props.id}
                    className={className}
                    onClick={this.props.onClick}
                    data-clipboard-text={this.props.text}
                >{this.props.icon}</i>
            </span>
        );
    }
});

module.exports = Icon;
