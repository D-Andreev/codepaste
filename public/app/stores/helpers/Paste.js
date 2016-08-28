var ApiUtils = require('../../Utils/ApiUtils');

/**
 * Paste
 * @constructor
 */
function Paste() {
    this._pasteId = 0;
    this._viewedPaste = null;
    this._title = '';
}

/**
 * Get paste
 * @param token
 * @param pasteId
 * @param done
 */
Paste.prototype.request = function (token, pasteId, done) {
    ApiUtils.getPaste(token, pasteId, done);
};

/**
 * Set paste
 * @param paste
 */
Paste.prototype.setPaste = function (paste) {
    this._viewedPaste = paste;
};

/**
 * Get paste
 * @returns {null}
 */
Paste.prototype.getPaste = function() {
    return this._viewedPaste;
};

/**
 * Set user
 * @param user
 */
Paste.prototype.setUser = function (user) {
    this._viewedPaste.user = user;
};

/**
 * Set paste id
 * @param id
 */
Paste.prototype.setPasteId = function (id) {
    this._pasteId = id;
};

/**
 * Set title
 * @param title
 */
Paste.prototype.setTitle = function (title) {
    this._title = title;
};

/**
 * Get title
 * @returns {*|string}
 */
Paste.prototype.getTitle = function () {
    return this._title;
};

/**
 * Destroy
 */
Paste.prototype.destroy = function() {
    this._viewedPaste = null;
    this._title = '';
    this._pasteId = 0;
};

module.exports = Paste;
