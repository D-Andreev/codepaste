request = require 'request'
USERS_API_URL = 'http://162.243.123.212'

module.exports = class Singleton
  instance = null

  class Users

    register: (user, done) ->
      request {method: 'PUT', uri: "#{USERS_API_URL}/", json: user}, (err, res) ->
        console.log(err);
        done err, res


    login: (user, done) ->
      authHeader = new Buffer("#{user.username}:#{user.password}").toString('base64');
      console.log 'THE AUTH HEADER: ', authHeader
      options =
        method: 'POST'
        uri: "#{USERS_API_URL}/token"
        json: user
        headers:
          'Authorization': "Basic #{authHeader}"

      request options, (err, res) ->
        console.log(err);
        done err, res

  @get: ->
    instance ?= new Users()
