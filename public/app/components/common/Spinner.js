var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Spinner = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        loading: ReactPropTypes.bool
    },

    /**
     * @return {object}
     */
    render: function() {
        var classes = {};
        classes[this.props.className] = this.props.className;
        classes.hidden = !this.props.loading;
        var className = classnames("loading-wrapper", classes);
        return (
            <div className={className}>
                <div className="mdl-spinner mdl-js-spinner is-active">

                </div>
            </div>
        );
    }
});

module.exports = Spinner;
