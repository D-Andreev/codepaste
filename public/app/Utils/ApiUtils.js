var $ = require('jquery');
var _ = require('lodash');
var Base64 = require('js-base64').Base64;

module.exports = {

    /**
     * Url
     */
    _url: '',

    /**
     * Set url
     * @param url
     */
    setUrl: function(url) {
        this._url = url;
    },

    /**
     * Get url
     * @returns {string}
     */
    getUrl: function() {
        return this._url;
    },

    /**
     * Register
     * @param username
     * @param email
     * @param password
     * @param done
     */
    register: function(username, email, password, done) {
        var data = {username: username, email: email, password: password};
        this.request('PUT', this._url + '/register', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Login
     * @param username
     * @param password
     * @param done
     */
    login: function(username, password, done) {
        var data = {username: username, password: password};
        this.request('POST', this._url + '/login', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Create new
     * @param user
     * @param data
     * @param done
     */
    createNew: function(user, data, done) {
        data.user = user;
        this.request('PUT', this._url + '/new', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Get paste
     * @param token
     * @param pasteId
     * @param done
     */
    getPaste: function (token, pasteId, done) {
        this.request('GET', this._url + '/paste/' + pasteId, false, token, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Validate token
     * @param token
     * @param done
     */
    validateToken: function (token, done) {
        this.request('POST', this._url + '/validate', false, token, done);
    },

    /**
     * Send message
     * @param user
     * @param message
     * @param done
     */
    sendMessage: function (user, message, done) {
        var data = {user: user, title: message.title, message: message.content};
        this.request('POST', this._url + '/contacts', data, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Send Rate
     * @param rate
     * @param user
     * @param done
     */
    sendRate: function (rate, user, done) {
        var data = {user: user, rate: rate};
        this.request('POST', this._url + '/rating', data, false, function(err, res) {
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
