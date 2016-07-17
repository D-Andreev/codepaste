var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Grid = React.createClass({

    propTypes: {
        hidden: ReactPropTypes.bool
    },


    /**
     * @return {object}
     */
    render: function() {
        var className = 'mdl-grid';
        if (this.props.hidden) className += ' hidden';
        return (
          <span className={className}>GRID</span>
        )
    }
});

module.exports = Grid;
