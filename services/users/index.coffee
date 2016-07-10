request = require 'request'
USERS_API_URL = 'http://162.243.123.212'

module.exports = class Singleton
  instance = null

  class Users

    register: (user, done) ->
      request {method: 'PUT', uri: "#{USERS_API_URL}/", json: user}, (err, res) ->
        console.log(err);
        done err, res

  @get: ->
    instance ?= new Users()
