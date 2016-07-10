module.exports = {
    /**
     * Set user in local storage
     * @param user
     */
    setUser: function(user) {
        localStorage.setItem('user', JSON.stringify(user));
    },

    /**
     * Get user from local storage
     */
    getUser: function() {
        return JSON.parse(localStorage.getItem('user'));
    },

    /**
     * Clear user from local storage
     */
    clearUser: function() {
        localStorage.setItem('user', JSON.stringify({}));
    }
};
