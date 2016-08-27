var Router = require('../../Utils/Router');

/**
 * View
 * @constructor
 */
function View () {
    this._view = '';
    this._registerBtnDisabled = false;
    this._loginBtnDisabled = false;
    this._fieldsDisabled = false;
    this._createNewBtnDisabled = false;
    this._loading = true;
}

/**
 * Init view
 * @param path
 */
View.prototype.initView = function(path) {
    if (!path) this._view = Router.getViewFromUrl();
    else this._view = {name: path};

    console.log('init view', path, this._view);
};

/**
 * Set url
 * @param viewName
 * @param props
 */
View.prototype.setUrl = function(viewName, props) {
    Router.setUrl(viewName, props);
};

/**
 * Set view
 * @param view
 */
View.prototype.setView = function(view) {
    this._view =  view;
};

/**
 * Get view
 * @returns {{name: *}|*|string}
 */
View.prototype.getView = function() {
    return this._view;
};

/**
 * Set register button disabled
 * @param disabled
 */
View.prototype.setRegisterBtnDisabled = function(disabled) {
    this._registerBtnDisabled = disabled;
};

/**
 * Get register button disabled
 * @returns {*|boolean}
 */
View.prototype.getRegisterBtnDisabled = function() {
    return this._registerBtnDisabled;
};

/**
 * Set login button disabled
 * @param disabled
 */
View.prototype.setLoginBtnDisabled = function(disabled) {
    this._loginBtnDisabled = disabled;
};

/**
 * Get login button disabled
 * @returns {*|boolean}
 */
View.prototype.getLoginBtnDisabled = function() {
    return this._loginBtnDisabled;
};

/**
 * Set fields disabled
 * @param disabled
 */
View.prototype.setFieldsDisabled = function(disabled) {
    this._fieldsDisabled = disabled;
};

/**
 * Get Fields disabled
 * @returns {*|boolean}
 */
View.prototype.getFieldsDisabled = function() {
    return this._fieldsDisabled;
};

/**
 * Set create new button disabled
 * @param disabled
 */
View.prototype.setCreateNewBtnDisabled = function(disabled) {
    this._createNewBtnDisabled = disabled;
};

/**
 * Get create new button disabled
 * @returns {*|boolean}
 */
View.prototype.getCreateNewBtnDisabled = function() {
    return this._createNewBtnDisabled;
};

/**
 * Set loading
 * @param loading
 */
View.prototype.setLoading = function(loading) {
    this._loading = loading;
};

/**
 * Get laoding
 * @returns {boolean|*}
 */
View.prototype.getLoading = function() {
    return this._loading;
};

/**
 * Get loading
 * @returns {*|boolean}
 */
View.prototype.getLoading = function() {
    return this._loading;
};

/**
 * Get view name
 * @returns {*}
 */
View.prototype.getViewName = function() {
    return this.getView().name;
};

/**
 * View
 * @type {View}
 */
module.exports = View;
