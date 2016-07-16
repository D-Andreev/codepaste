var routes = require('../constants/routes');


module.exports = {
    setUrl: function(path) {
        history.pushState(null, '', path);
    },

    getViewFromUrl: function() {
        var hash = '/' + location.hash;
        if (!location.hash) hash = '/';
        var views = Object.keys(routes);
        for (var i = 0; i < views.length; i++) {
            if (routes[views[i]].test(hash)) return views[i];
        }

        return views[0];
    }
};
