// Generated by CoffeeScript 1.10.0
(function() {
  var Paste, Rating, Response, STATUS_CODES, express, routes;

  express = require('express');

  routes = require('../../lib/router/routes');

  Paste = require('../../models/paste');

  Response = require('../../lib/response/index');

  Rating = require('../../services/rating');

  STATUS_CODES = require('../../lib/constants').STATUS_CODES;

  module.exports = express.Router().post(routes.rating, function(req, response) {
    if (!(req.body.user || req.body.pasteId || req.body.rate)) {
      return response.status(STATUS_CODES.BAD_REQUEST).json({});
    }
    return Paste.findOne({
      _id: req.body.pasteId
    }, function(err, paste) {
      if (!paste || !paste.user) {
        return response.status(STATUS_CODES.NOT_FOUND).json({});
      }
      paste = Rating.get().vote(req.body.user.user.email, paste, req.body.rate);
      return paste.save(function(err, res) {
        var body, ref, statusCode;
        ref = new Response(err, res, STATUS_CODES.OK), statusCode = ref.statusCode, body = ref.body;
        return response.status(statusCode).json(body);
      });
    });
  });

}).call(this);

//# sourceMappingURL=index.js.map
