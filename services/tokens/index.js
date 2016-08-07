// Generated by CoffeeScript 1.10.0
(function() {
  var STATUS_CODES, Singleton, USERS_API_URL, _getAuthHeader, ref, request;

  request = require('request');

  ref = require('../../lib/constants'), STATUS_CODES = ref.STATUS_CODES, USERS_API_URL = ref.USERS_API_URL;

  _getAuthHeader = function(req) {
    var header;
    header = req.get('Authorization');
    if (!header) {
      return false;
    }
    return header.replace('Basic ', '').replace('Bearer ', '');
  };

  module.exports = Singleton = (function() {
    var Tokens, instance;

    function Singleton() {}

    instance = null;

    Tokens = (function() {
      function Tokens() {}

      Tokens.prototype.validateToken = function(req, res, done) {
        var token;
        token = _getAuthHeader(req);
        if (!token) {
          return res.status(STATUS_CODES.UNAUTHORIZED).json({});
        }
        return this._validate(token, done);
      };

      Tokens.prototype.validateWs = function(req, done) {
        var e, error, obj, token;
        try {
          obj = JSON.parse(req);
        } catch (error) {
          e = error;
          return done({
            statusCode: STATUS_CODES.UNAUTHORIZED
          });
        }
        token = obj.token;
        if (!token) {
          return done({
            statusCode: STATUS_CODES.UNAUTHORIZED
          });
        }
        return this._validate(token, done);
      };

      Tokens.prototype._validate = function(token, done) {
        var options;
        options = {
          method: 'POST',
          uri: USERS_API_URL + "/validate",
          headers: {
            'Authorization': "Bearer " + token
          }
        };
        return request(options, done);
      };

      return Tokens;

    })();

    Singleton.get = function() {
      return instance != null ? instance : instance = new Tokens();
    };

    return Singleton;

  })();

}).call(this);

//# sourceMappingURL=index.js.map