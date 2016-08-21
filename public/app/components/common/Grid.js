var React = require('react');
var ReactPropTypes = React.PropTypes;
var Icon = require('./Icon');
var moment = require('moment');

var Grid = React.createClass({
    
    propTypes: {
        onActionClick: ReactPropTypes.func,
        columns: ReactPropTypes.object,
        rows: ReactPropTypes.array,
        search: ReactPropTypes.func,
        sort: ReactPropTypes.func,
        sortingOptions: ReactPropTypes.object,
        pagination: ReactPropTypes.object,
        paginate: ReactPropTypes.func,
        totalPastes: ReactPropTypes.number
    },

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
                    <input className="mdl-textfield__input" onChange={this._onSearch} type="text" id="search" placeholder="Search by any column..." />
                        <label className="mdl-textfield__label">Expandable Input</label>
                </div>
            </div>
        )
    },

    /**
     * On search
     * @param e
     * @private
     */
    _onSearch: function (e) {
        this.props.search(e.target.value);
    },

    /**
     * Render pagination
     * @returns {XML}
     * @private
     */
    _renderPagination: function () {
        if (this.props.rows.length) {
            var i, c = 0, pages = [], markup = [], pagesLength = 0, rightPagesExist, leftPagesExist;
            var totalRows = this.props.totalPastes;
            var skip = this.props.pagination.skip;
            var rowsPerPage = this.props.pagination.limit;
            var pagesCount = Math.floor(totalRows / rowsPerPage) + 1;
            var currentPage = skip > 0 ? parseInt(skip / rowsPerPage) + 1 : 1;

            if (skip > 0) {
                for (i = currentPage - 1; i > 0; i--) {
                    if (pages.length >= 3) break;
                    leftPagesExist = true;
                    pages.push(i);
                }

                pages.reverse();
            }
            markup.push(
                this._renderPaginationButton(false, 1, 'pagination' + 1, '', 'first_page')
            );

            if (leftPagesExist) {
                markup.push(
                    this._renderPaginationButton(false, currentPage - 1, 'pagination' + 2, '', 'keyboard_arrow_left')
                );
            }
            pages.push(currentPage);

            for (i = currentPage + 1; i <= pagesCount; i++) {
                if (c >= 3) break;
                rightPagesExist = true;
                pages.push(i);
                c++;
            }
            pagesLength = pages.length;
            for (i = 0; i < pagesLength; i++) {
                var isCurrentPage = pages[i] == currentPage;
                markup.push(
                    this._renderPaginationButton(isCurrentPage, pages[i], 'pagination' + i + 2, pages[i].toString(), false)
                )
            }

            if (rightPagesExist) {
                markup.push(
                    this._renderPaginationButton(false, currentPage + 1, 'pagination' + pagesLength + 2, '', 'keyboard_arrow_right')
                );
            }

            markup.push(
                this._renderPaginationButton(false, pagesCount, 'pagination' + pagesLength + 3, '', 'last_page')
            );

            return (
                <div className="pagination">
                    {markup}
                </div>
            )
        }
    },

    /**
     * Render pagination button
     * @param isCurrentPage
     * @param index
     * @param key
     * @param label
     * @param icon
     * @param primary
     * @param disabled
     * @returns {XML}
     * @private
     */
    _renderPaginationButton: function (isCurrentPage, index, key, label, icon) {
        var className = 'pagination-button';
        if (icon) label = <i className="material-icons">{icon}</i>;
        else className += ' page';

        if (isCurrentPage) className += ' selected';


        return (
            <div key={key} className={className} onClick={this._paginate.bind(this, index)}>{label}</div>
        )
    },

    /**
     * Paginate
     * @param page
     * @private
     */
    _paginate: function (page) {
        this.props.paginate(page);
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
            var direction = this._getDirection(this.props.columns[i].text);
            titles.push(
                <div
                    className="grid-header-title"
                    key={'header-row' + i}
                    onClick={this._onSort.bind(this, this.props.columns[i].text, direction)}
                >
                    <Icon
                        wrapperClassName="grid-header-title-icon"
                        icon={this.props.columns[i].icon}
                        className="vertical-align"
                    />
                    <span className="vertical-align header-label">
                        {this.props.columns[i].text}
                    </span>
                    {this._renderSortIcon(this.props.columns[i].text)}
                </div>
            )
        }

        return titles;
    },

    /**
     * On sort
     * @param text
     * @param direction
     * @private
     */
    _onSort: function (text, direction) {
        if (text == 'username') return;
        this.props.sort(text, direction);
    },

    /**
     * Get direction
     * @param col
     * @returns {number}
     * @private
     */
    _getDirection: function (col) {
        if (col != this.props.sortingOptions.col) return -1;
        else {
            if (this.props.sortingOptions.direction == -1) return 1;
            else return -1;
        }
    },

    /**
     * Render Sort Icon
     * @param col
     * @returns {XML}
     * @private
     */
    _renderSortIcon: function(col) {
        if (col != this.props.sortingOptions.col || col == 'username') return;

        return (
            <Icon
                wrapperClassName="grid-header-title-icon"
                icon={this._getDirectionIcon()}
                className="vertical-align sort-icon"
            />
        )
    },

    /**
     * Get direction icon name
     * @returns {*}
     * @private
     */
    _getDirectionIcon: function() {
        if (this.props.sortingOptions.direction == -1) return 'arrow_drop_down';
        else return 'arrow_drop_up'
    },

    /**
     * Render rows
     * @returns {Array}
     * @private
     */
    _renderRows: function() {
        if (this.props.rows.length == 0) {
            return (
                <div className="grid-row no-results">
                    <h3>No results</h3>
                </div>
            )
        }
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
