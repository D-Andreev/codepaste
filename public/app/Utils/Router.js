var routes = require('../constants/routes');


module.exports = {
    /**
     * Set url
     * @param path
     * @param props
     */
    setUrl: function(path, props) {
        var hash = '';
        if (props) {
            var parts = Object.keys(props);
            for (var i = 0; i < parts.length; i++) {
                hash += '/' + props[parts[i]];
            }
        }
        history.pushState(null, '', path + hash);
    },

    /**
     * Get view from path
     * @returns {*}
     */
    getViewFromUrl: function() {
        var hash = '/' + location.hash;
        if (!location.hash) return {name: '/'};
        var views = Object.keys(routes);
        for (var i = 0; i < views.length; i++) {
            if (routes[views[i]].test(hash)) return {name: views[i], props: this._getPropsFromUrl(hash)};
        }

        return {name: views[0]};
    },

    /**
     * Get props from url
     * @param url
     * @private
     */
    _getPropsFromUrl: function(url) {
        var parts = url.split('/');
        var id = parts[parts.length - 1];
        if (id) return {id: id};
        else return false;
    }
};
