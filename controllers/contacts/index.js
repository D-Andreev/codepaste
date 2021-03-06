// Generated by CoffeeScript 1.10.0
(function() {
  var Mail, Response, STATUS_CODES, express, routes;

  express = require('express');

  routes = require('../../lib/router/routes');

  Response = require('../../lib/response/index');

  STATUS_CODES = require('../../lib/constants').STATUS_CODES;

  Mail = require('../../services').Mail;

  module.exports = express.Router().post(routes.contacts, function(req, response) {
    return Mail.get().send(req.body, function(err, res) {
      var body, ref, statusCode;
      ref = new Response(err, res, STATUS_CODES.OK), statusCode = ref.statusCode, body = ref.body;
      return response.status(statusCode).send(body);
    });
  });

}).call(this);

//# sourceMappingURL=index.js.map
