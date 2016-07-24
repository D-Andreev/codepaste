express = require 'express'
routes = require '../../lib/router/routes'
Paste = require '../../models/paste'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'

module.exports = express.Router().put routes.newPaste, (req, res) ->
  body = req.body
  body.code = body.value
  delete body.value
  paste = new Paste body
  
  paste.save (err, paste) ->
    {statusCode, body} = new Response err, paste, STATUS_CODES.CREATED
    body.user = username: body.user.username
    return res.status(statusCode).json body
