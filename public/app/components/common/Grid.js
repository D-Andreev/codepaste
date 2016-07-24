var React = require('react');
var ReactPropTypes = React.PropTypes;
var classnames = require('classnames');
var Icon = require('./Icon');
var moment = require('moment');

var Grid = React.createClass({

    /**
     * @return {object}
     */
    render: function() {
        return (
            <div className="grid mdl-shadow--2dp">
                {this._renderSearch()}
                {this._renderHeader()}
                {this._renderRows()}
                {this._renderPagination()}
            </div>
        )
    },

    /**
     * Render search input
     * @returns {XML}
     * @private
     */
    _renderSearch: function () {
        return (
            <div className="mdl-textfield mdl-js-textfield mdl-textfield--expandable grid-search">
                <label className="mdl-button mdl-js-button mdl-button--icon" htmlFor="search">
                    <i className="material-icons">search</i>
                </label>
                <div className="mdl-textfield__expandable-holder">
                    <input className="mdl-textfield__input" type="text" id="search" placeholder="Search by any column..." />
                        <label className="mdl-textfield__label">Expandable Input</label>
                </div>
            </div>
        )
    },

    /**
     * Render pagination
     * @returns {XML}
     * @private
     */
    _renderPagination: function () {
        return (
            <h2>Pagination</h2>
        )
    },

    /**
     * Render header
     * @returns {XML}
     * @private
     */
    _renderHeader: function() {
        return (
            <div className="grid-header">
                {this._renderTitles()}
            </div>
        )
    },

    /**
     * Render titles
     * @returns {Array}
     * @private
     */
    _renderTitles: function () {
        var titles = [];
        for (var i = 0; i < this.props.columns.length; i++) {
            titles.push(
                <div
                    className="grid-header-title"
                    key={'header-row' + i}
                >
                    <Icon
                        wrapperClassName="grid-header-title-icon"
                        icon={this.props.columns[i].icon}
                        className="vertical-align"
                    />
                    <span className="vertical-align">
                        {this.props.columns[i].text}
                    </span>
                </div>
            )
        }

        return titles;
    },

    /**
     * Render rows
     * @returns {Array}
     * @private
     */
    _renderRows: function() {
        var markup = [];
        for (var i = 0; i < this.props.rows.length; i++) {
            var row = this.props.rows[i];
            markup.push(
                <div className="grid-row" key={'row' + i} onClick={this._onActionClick.bind(this, row)}>
                    {this._renderCols(i)}
                </div>
            )
        }

        return markup;
    },

    /**
     * Render cols
     * @param rowIndex
     * @returns {Array}
     * @private
     */
    _renderCols: function(rowIndex) {
        var cols = [], keys = [], i = 0;
        var row = this.props.rows[rowIndex];
        for (i = 0; i < this.props.columns.length; i++) {
            keys.push(this.props.columns[i].text);
        }
        for (i = 0; i < keys.length; i++) {
            if (keys[i] == 'username') {
                var text = row.user.user.username;
                cols.push(
                    <div className="grid-cell username" key={'col' + i} title={text}>
                        {text}
                    </div>
                )
            } else if (keys[i] == 'created') {
                var date = moment(row[keys[i]]).format('MMMM Do YYYY, h:mm:ss a');
                cols.push(
                    <div className="grid-cell" key={'col' + i} title={date}>
                        {date}
                    </div>
                )
            } else {
                cols.push(
                    <div className="grid-cell" key={'col' + i} title={row[keys[i]]}>
                        {row[keys[i]]}
                    </div>
                )
            }
        }

        return cols;
    },

    /**
     * On action click
     * @param row
     * @private
     */
    _onActionClick: function (row) {
        this.props.onActionClick(row);
    }
});

module.exports = Grid;
