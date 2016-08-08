express = require 'express'
routes = require '../../lib/router/routes'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'
{Tokens} = require '../../services'

module.exports = express.Router().post routes.validate, (req, res) ->
  Tokens.get().validateToken req, res, (err, token) ->
    {statusCode, body} = new Response err, token, STATUS_CODES.OK
    return res.status(statusCode).send body
