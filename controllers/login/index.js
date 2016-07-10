// Generated by CoffeeScript 1.10.0
(function() {
  var Response, STATUS_CODES, Users, express, routes;

  express = require('express');

  routes = require('../../lib/router/routes');

  Response = require('../../lib/response/index');

  STATUS_CODES = require('../../lib/constants').STATUS_CODES;

  Users = require('../../services/users');

  module.exports = express.Router().post(routes.login, function(req, res) {
    return Users.get().login(req.body, function(err, result) {
      var body, ref, statusCode;
      ref = new Response(err, result, STATUS_CODES.OK), statusCode = ref.statusCode, body = ref.body;
      return res.json(body);
    });
  });

}).call(this);

//# sourceMappingURL=index.js.map
