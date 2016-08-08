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
        this.request('POST', url + '/login', data, function(err, res) {
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
        this.request('PUT', url + '/new', data, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Get paste
     * @param url
     * @param pasteId
     * @param done
     */
    getPaste: function (url, pasteId, done) {
        this.request('GET', url + '/paste?id=' + pasteId, false, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Send message
     * @param url
     * @param user
     * @param message
     * @param done
     */
    sendMessage: function (url, user, message, done) {
        var data = {user: user, title: message.title, content: message.content};
        this.request('POST', url + '/login', data, function(err, res) {
            done(err, res);
        });
    },

    /**
     * Request
     * @param method
     * @param url
     * @param data
     * @param done
     */
    request: function(method, url, data, done) {
        $.ajax(
            {
                url: url,
                data: data,
                method: method,

                success: function(result) {
                    done(null, result);
                },
                error: function(error) {
                    done(error, false);
                }
        });
    }
};
