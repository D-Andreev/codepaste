// Generated by CoffeeScript 1.10.0
(function() {
  var _, expect, request, result, statusCode;

  request = require('request');

  _ = require('lodash');

  expect = require('chai').expect;

  statusCode = 0;

  result = null;

  module.exports = function() {
    return this.When(/^I login with$/, function(credentials, done) {
      return request;
    });
  };

}).call(this);

//# sourceMappingURL=users_steps.js.map
