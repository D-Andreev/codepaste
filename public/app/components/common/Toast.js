var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');

var Toast = React.createClass({

    propTypes: {
        className: ReactPropTypes.string,
        toast: ReactPropTypes.string,
        show: ReactPropTypes.bool,
        callback: ReactPropTypes.func
    },

    componentDidUpdate: function() {
        if (this.props.toast && this.props.show) this._show();
    },

    /**
     * @return {object}
     */
    render: function() {
        return (
            <div id="toast" className="mdl-js-snackbar mdl-snackbar">
                <div className="mdl-snackbar__text"></div>
                <button className="mdl-snackbar__action" type="button"></button>
            </div>
        )
    },

    _show: function() {
        var toast = document.querySelector('#toast');
        toast.MaterialSnackbar.showSnackbar({message: this.props.toast});
        this.props.callback();
    }
});

module.exports = Toast;
