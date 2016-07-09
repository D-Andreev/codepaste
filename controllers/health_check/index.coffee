express = require 'express'
routes = require '../../lib/router/routes'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'


module.exports = express.Router().get routes.healthCheck, (req, res) ->
  {statusCode, body} = new Response null, {}, STATUS_CODES.OK
  return res.status(statusCode).send body
