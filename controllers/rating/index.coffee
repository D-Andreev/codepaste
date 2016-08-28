express = require 'express'
routes = require '../../lib/router/routes'
Paste = require '../../models/paste'
Response = require '../../lib/response/index'
Rating = require '../../services/rating'
{STATUS_CODES} = require '../../lib/constants'

module.exports = express.Router().post routes.rating, (req, response) ->
  unless req.body.user or req.body.pasteId or req.body.rate
    return response.status(STATUS_CODES.BAD_REQUEST).json {}

  Paste.findOne {_id: req.body.pasteId}, (err, paste) ->
    if not paste or not paste.user
      return response.status(STATUS_CODES.NOT_FOUND).json {}
  
    paste = Rating.get().vote req.body.user.user.email, paste, req.body.rate
    paste.save (err, res) ->
      {statusCode, body} = new Response err, res, STATUS_CODES.OK
      response.status(statusCode).json body
