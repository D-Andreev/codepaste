var React = require('react');
var ReactPropTypes = React.PropTypes;

var List = React.createClass({
    
    propTypes: {
        hidden: ReactPropTypes.bool,
        items: ReactPropTypes.array
    },

    /**
     * @return {object}
     */
    render: function() {
        var className = '';
        if (this.props.hidden) className = 'hidden';
        return (
            <span className={className}>
                {this._renderItems()}
            </span>
        );
    },

    /**
     * Render items
     * @returns {Array}
     * @private
     */
    _renderItems: function() {
        var items = [];
        for(var i = 0; i < this.props.items.length; i++) {
            items.push(
                <li className="mdl-list__item" key={this.props.items[i].label}>
                    <span className="mdl-list__item-primary-content">
                        <i className="material-icons mdl-list__item-icon">{this.props.items[i].icon}</i>
                        {this.props.items[i].label}
                    </span>
                </li>
            )
        }

        return items;
    }
});

module.exports = List;
