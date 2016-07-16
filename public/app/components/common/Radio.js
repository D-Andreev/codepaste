var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Input = React.createClass({

    propTypes: {
        onCheck: ReactPropTypes.func,
        label: ReactPropTypes.string,
        name: ReactPropTypes.string,
        value: ReactPropTypes.string,
        checked: ReactPropTypes.bool
    },

    /**
     * @return {object}
     */
    render: function() {
        var id = this.props.value + '-id';
        return (
            <label className="mdl-radio mdl-js-radio mdl-js-ripple-effect" htmlFor={id}>
                <input
                    id={id}
                    type="radio"
                    value={this.props.value}
                    className="mdl-radio__button"
                    onClick={this._onClick}
                    checked={this.props.checked}
                    onChange={this._onChange}
                />
                    <span className="mdl-radio__label">{this.props.label}</span>
            </label>
        )
    },

    _onChange: function() {},
        
    _onClick: function() {
        console.log('ON LICK',this.props.value);
        this.props.onCheck(this.props.value);
    }
});

module.exports = Input;
