/**
 * Toast
 * @constructor
 */
function Toast () {
    this._toast = '';
    this._type = 'notification';
}

/**
 * Set toast
 * @param toast
 */
Toast.prototype.setToast = function(toast) {
    this._toast = toast;
};

/**
 * Get toast
 * @returns {*|string}
 */
Toast.prototype.getToast = function() {
    return this._toast;
};

/**
 * Set type
 * @param type
 */
Toast.prototype.setType = function(type) {
    this._type = type;
};

/**
 * Get type
 * @returns {string|*}
 */
Toast.prototype.getType = function() {
    return this._type;
};

/**
 * Set notification
 * @param toast
 * @param type
 */
Toast.prototype.setNotification = function(toast, type) {
    this.setToast(toast);
    this.setType(type);
};

module.exports = Toast;
