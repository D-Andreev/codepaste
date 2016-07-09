module.exports = class Singleton
  instance = null

  class Request

    validateToken: (req) ->
      authHeader = @getAuthHeader req
      return false unless authHeader

      token = @_getTokenFromHeader authHeader
      return false unless token

      token


    getAuthHeader: (req) ->
      header = req.get 'Authorization'
      return false unless header

      header.replace('Basic ', '').replace('Bearer ', '')


    getCredentialsFromHeader: (authHeader) ->
      buffer = new Buffer(authHeader, 'base64').toString()
      split = buffer.split ':'

      username: split[0]
      password: split[1]


    _getTokenFromHeader: (authHeader) ->
      new Buffer(authHeader, 'base64').toString()


  @get: ->
    instance ?= new Request()
