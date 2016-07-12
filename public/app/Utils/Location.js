module.exports = {
    /**
     * Remove get params from url
     * @param url
     * @returns {string}
     */
    removeGet: function(url) {
        return url.substring(0, url.indexOf('?'));
    },

    getMainView: function(url) {
        var pathname = location.pathname;
        if (pathname == '/') return pathname;

        var splitUrl = pathname.split('/');
        

    }
};
