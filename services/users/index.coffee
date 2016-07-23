request = require 'request'
{USERS_API_URL} = require '../../lib/constants'

module.exports = class Singleton
  instance = null

  class Users

    register: (user, done) ->
      request {method: 'PUT', uri: "#{USERS_API_URL}/", json: user}, (err, res) ->
        done err, res


    login: (user, done) ->
      authHeader = new Buffer("#{user.username}:#{user.password}").toString('base64')
      options =
        method: 'POST'
        uri: "#{USERS_API_URL}/token"
        json: user
        headers:
          'Authorization': "Basic #{authHeader}"

      request options, (err, res) ->
        done err, res

  @get: ->
    instance ?= new Users()
