express = require 'express'
_ = require 'lodash'
routes = require '../../lib/router/routes'
Paste = require '../../models/paste'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'
Server = require '../../lib/server'

module.exports = express.Router().put routes.newPaste, (req, response) ->
  body = req.body
  body.code = body.value
  delete body.value
  paste = new Paste body

  paste.save (err, paste) ->
    {statusCode, body} = new Response err, paste, STATUS_CODES.CREATED
    body.user = username: body.user.username
    _.forEach Server.get().ws.getWss().clients, (client) ->
      client.send JSON.stringify({action: 'update'})
    return response.status(statusCode).json body
