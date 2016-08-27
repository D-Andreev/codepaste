/**
 * Contacts
 * @constructor
 */
function Contacts () {
    this.message = {title: '', content: ''};
    this.buttonDisabled = false;
}

/**
 * Get message
 * @returns {{title: string, content: string}|*}
 */
Contacts.prototype.getMessage = function() {
    return this.message;
};

/**
 * Set title
 * @param title
 */
Contacts.prototype.setTitle = function(title) {
    this.message.title = title;
};

/**
 * Get title
 * @returns {string}
 */
Contacts.prototype.getTitle = function() {
    return this.message.title;
};

/**
 * Set content
 * @param content
 */
Contacts.prototype.setContent = function(content) {
    this.message.content = content;
};

/**
 * Get content
 * @returns {string}
 */
Contacts.prototype.getContent = function() {
    return this.message.content;
};

/**
 * Set button disabled
 * @param disabled
 */
Contacts.prototype.setButtonDisabled = function(disabled) {
    this.buttonDisabled = disabled;
};

/**
 * Get button disabled
 * @returns {*|boolean}
 */
Contacts.prototype.getButtonDisabled = function() {
    return this.buttonDisabled;
};

module.exports = Contacts;
