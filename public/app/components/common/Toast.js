var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Toast = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        toast: ReactPropTypes.string,
        show: ReactPropTypes.bool,
        callback: ReactPropTypes.func,
        type: ReactPropTypes.oneOf(['warning', 'success', 'error', 'notification'])
    },

    componentDidUpdate: function() {
        if (this.props.toast && this.props.show) this._show();
    },

    /**
     * @return {object}
     */
    render: function() {
        console.log('Toast: ', this.props);
        var $this = this;
        var color = 'mdl-color--' + $this._getColor();
        var className = 'mdl-js-snackbar mdl-snackbar ' + color;
        return (
            <div id="toast" className={className}>
                <div className="mdl-snackbar__text"></div>
                <button className="mdl-snackbar__action" type="button"></button>
            </div>
        )
    },

    _getColor: function() {
        var color = 'grey';
        if (this.props.type == 'warning') {
            color = 'orange';
        } else if (this.props.type == 'success') {
            color = 'green';
        } else if (this.props.type == 'error') {
            color = 'red';
        } else if (this.props.type == 'notification') {
            color = 'blue';
        }

        return color;
    },

    _show: function() {
        var toast = document.querySelector('#toast');
        toast.MaterialSnackbar.showSnackbar({message: this.props.toast});
        this.props.callback();
    }
});

module.exports = Toast;
