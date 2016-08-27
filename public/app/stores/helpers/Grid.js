function Grid () {
    this._pastes = [];
    this._filter = {};
    this._pagination = {skip: 0, limit: 10};
    this._sort = {col: 'created', direction: -1};
    this._totalPastes = 0;
}

/**
 * Set pastes
 * @param pastes
 */
Grid.prototype.setPastes = function(pastes) {
    this._pastes = pastes;
};

/**
 * Get pastes
 * @returns {*|Array}
 */
Grid.prototype.getPastes = function() {
    return this._pastes;
};

/**
 * Set filter
 * @param filter
 */
Grid.prototype.setFilter = function(filter) {
    this._filter = filter || '';
};

/**
 * Get filter
 * @returns {*}
 */
Grid.prototype.getFilter = function() {
    return this._filter;
};

/**
 * Set pagination
 * @param pagination
 */
Grid.prototype.setPagination = function(pagination) {
    this._pagination = pagination;
};

/**
 * Get pagination
 * @returns {{skip: number, limit: number}|*}
 */
Grid.prototype.getPagination = function() {
    return this._pagination;
};

/**
 * Set sort
 * @param sort
 */
Grid.prototype.setSort = function(sort) {
    this._sort = sort;
};

/**
 * Get sort
 * @returns {*}
 */
Grid.prototype.getSort = function() {
    var sort = {};
    sort[this._sort.col] = this._sort.direction;
    return {
        sort: sort
    }
};

/**
 * Get s
 * @returns {*}
 */
Grid.prototype.getSortOptions = function() {
    return this._sort;
};

/**
 * Set total pastes
 * @param pastes
 */
Grid.prototype.setTotalPastes = function(pastes) {
    this._totalPastes = pastes;
};

/**
 * Get total pastes
 * @returns {number}
 */
Grid.prototype.getTotalPastes = function() {
    return this._totalPastes;
};

module.exports = Grid;
