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
        console.log('AJAX', url, data);
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
                    console.log('success', result);
                    done(null, result);
                },
                error: function(error) {
                    console.log('error in request', error);
                    done(error, false);
                }
        });
    }
};