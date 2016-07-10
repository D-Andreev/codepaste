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
     * Request
     * @param method
     * @param url
     * @param data
     * @param done
     */
    request: function(method, url, data, done) {
        $.ajax(
            {
                url: url + '/register',
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
