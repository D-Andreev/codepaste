routes = require './routes'
{healthCheck, index, register} = require '../../controllers'
{STATUS_CODES} = require '../constants'

module.exports = class Singleton
  instance = null

  class Router

    setRoutes: (app) ->
      app.all routes.all, (req, res, next) ->
        # CORS headers
        res.header 'Access-Control-Allow-Origin', '*'
        # restrict it to the required domain
        res.header 'Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS'
        # Set custom headers for CORS
        res.header 'Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key'
        return res.status(STATUS_CODES.OK).end() if req.method == 'OPTIONS'
        next()
      app.get routes.index, index
      app.get routes.healthCheck, healthCheck
      app.put routes.register, register


  @get: ->
    instance ?= new Router()
