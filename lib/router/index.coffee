_ = require 'lodash'
routes = require './routes'
{healthCheck, index, register, login, newPaste, paste, pastes} = require '../../controllers'
Server = require '../../lib/server'
Pastes = require '../../models/pastes'
{STATUS_CODES} = require '../../lib/constants'

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
      app.post routes.login, login
      app.put routes.newPaste, newPaste
      app.get routes.paste, paste
      app.ws routes.pastes, (ws, req) ->
        clients = Server.get().ws.getWss().clients
        setInterval (->
          Pastes.getPastes {}, (err, docs) ->
            _.forEach Server.get().ws.getWss().clients, (client) -> client.send JSON.stringify(docs)
        ), 1000
        ws.on 'message', (msg) ->
          pastes(ws, msg)


  @get: ->
    instance ?= new Router()
