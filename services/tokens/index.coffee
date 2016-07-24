request = require 'request'
{STATUS_CODES} = require '../../lib/constants'
{USERS_API_URL} = require '../../lib/constants'

_getAuthHeader = (req) ->
  header = req.get 'Authorization'
  return false unless header

  header.replace('Basic ', '').replace('Bearer ', '')

module.exports = class Singleton
  instance = null

  class Tokens

    validate: (req, res, next) ->
      token = _getAuthHeader req
      return res.status(STATUS_CODES.UNAUTHORIZED).json {} unless token

      @_validate token, done

      
    validateWs: (req, done) ->
      try
        obj = JSON.parse req
      catch e
        return done statusCode: STATUS_CODES.UNAUTHORIZED

      token = obj.token
      return done statusCode: STATUS_CODES.UNAUTHORIZED unless token

      @_validate token, done


    _validate: (token, done) ->
      options =
        method: 'POST'
        uri: "#{USERS_API_URL}/validate"
        json: {token}
        headers:
          'Authorization': "Bearer #{new Buffer(token).toString('base64')}"

      request options, done

  @get: ->
    instance ?= new Tokens()
