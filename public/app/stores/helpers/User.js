var DEFAULT_USER = {
    token: null, refreshToken: null,
    user: {username: '', password: '', email: '', firstName: '', lastName: ''}};
var ApiUtils = require('../../Utils/ApiUtils');
var LocalStorage = require('../../Utils/LocalStorage');


/**
 * User
 * @param user
 * @constructor
 */
function User (user) {
    this._setUser(user);
}

/**
 * Set initial user
 * @param user
 * @private
 */
User.prototype._setUser = function(user) {
    if (!user || Object.keys(user).length === 0) this._user = DEFAULT_USER;
    else this._user = user;
};

/**
 * Set user
 * @param user
 */
User.prototype.setUser = function(user) {
    this._user = user;
};

/**
 * Get user
 * @returns {*|{username: string, password: string, email: string, firstName: string, lastName: string}}
 */
User.prototype.getUser = function () {
    return this._user;
};

/**
 * Set username
 * @param username
 */
User.prototype.setUsername = function(username) {
    this._user.user.username = username;
};

/**
 * Get username
 * @returns {*}
 */
User.prototype.getUsername = function() {
    return this._user.user.username;
};

/**
 * Set password
 * @param password
 */
User.prototype.setPassword = function (password) {
    this._user.user.password = password;
};

/**
 * Get password
 */
User.prototype.getPassword = function () {
    return this._user.password;
};

/**
 * Set first name
 * @param firstName
 */
User.prototype.setFirstName = function(firstName) {
    this._user.user.firstName = firstName;
};

/**
 * Get first name
 * @returns {string|*}
 */
User.prototype.getFirstName = function() {
    return this._user.user.firstName;
};

/**
 * Set last name
 * @param lastName
 */
User.prototype.setLastName = function(lastName) {
    this._user.user.firstName = lastName;
};

/**
 * Get last name
 * @returns {string|*}
 */
User.prototype.getLastName = function() {
    return this._user.user.lastName;
};

/**
 * Set email
 * @param email
 */
User.prototype.setEmail = function(email) {
    this._user.user.email = email;
};

/**
 * Get email
 * @returns {*}
 */
User.prototype.getEmail = function() {
    return this._user.user.email;
};

/**
 * Set token
 * @param token
 */
User.prototype.setToken = function (token) {
    this._user.token = token;
};

/**
 * Get token
 * @returns {*}
 */
User.prototype.getToken = function() {
    return this._user.token;
};

/**
 * Set refresh token
 * @param refreshToken
 */
User.prototype.setRefreshToken = function (refreshToken) {
    this._user.refreshToken = refreshToken;
};

/**
 * Get refresh token
 * @returns {*}
 */
User.prototype.getRefreshToken = function() {
    return this._user.refreshToken;
};

User.prototype.isLoggedIn = function(done) {
    if (!this.getToken() || !this.getRefreshToken()) return done({status: 401});
    ApiUtils.validateToken(this.getToken(), done);
};

/**
 * Save user
 * @param user
 */
User.prototype.saveUser = function(user) {
    this._user = user;
    LocalStorage.setUser(this._user);
};

/**
 * Logout
 */
User.prototype.logout = function() {
    LocalStorage.clearUser();
    location.reload();
};

module.exports = User;

