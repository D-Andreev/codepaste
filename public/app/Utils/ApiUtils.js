var $ = require('jquery');

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
        this.request('PUT', url + '/register', data, function(err, res) {
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
