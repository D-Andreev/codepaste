var $ = require('jquery');
var _ = require('lodash');
var Base64 = require('js-base64').Base64;

module.exports = {
    /**
     * Register
     * @param url
     * @param username
     * @param email
     * @param password
     * @param done
     */
    register: function(url, username, email, password, done) {
        var data = {username: username, email: email, password: password};
        this.request('PUT', url + '/register', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Login
     * @param url
     * @param username
     * @param password
     * @param done
     */
    login: function(url, username, password, done) {
        var data = {username: username, password: password};
        this.request('POST', url + '/login', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Create new
     * @param url
     * @param user
     * @param data
     * @param done
     */
    createNew: function(url, user, data, done) {
        data.user = user;
        this.request('PUT', url + '/new', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Get paste
     * @param token
     * @param url
     * @param pasteId
     * @param done
     */
    getPaste: function (token, url, pasteId, done) {
        this.request('GET', url + '/paste/' + pasteId, false, token, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Validate token
     * @param url
     * @param token
     * @param done
     */
    validateToken: function (url, token, done) {
        this.request('POST', url + '/validate', false, token, done);
    },

    /**
     * Send message
     * @param url
     * @param user
     * @param message
     * @param done
     */
    sendMessage: function (url, user, message, done) {
        var data = {user: user, title: message.title, message: message.content};
        this.request('POST', url + '/contacts', data, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Request
     * @param method
     * @param url
     * @param data
     * @param token
     * @param done
     */
    request: function(method, url, data, token, done) {
        var $this = this;
        $.ajax(
            {
                url: url,
                data: data,
                method: method,
                beforeSend: function (request) {
                    request.setRequestHeader("Authorization", $this._buildAuthToken(token));
                },
                success: function(result) {
                    done(null, result);
                },
                error: function(error) {
                    done(error, false);
                }
            });
    },

    /**
     * Build auth token
     * @param token
     * @returns {string}
     * @private
     */
    _buildAuthToken: function(token) {
        return "Bearer " + Base64.encode(token);
    },

    /**
     * Build query string
     * @param params
     * @returns {string}
     * @private
     */
    _buildQs: function (params) {
        var q = '?';
        _.forEach(_.keys(params), function(param) {
            q += encodeURIComponent(param) + '=' + encodeURIComponent(params[param]) + '&';
        });

        return q.substring(0, q.length - 1);
    }
};