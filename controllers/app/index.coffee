express = require 'express'
routes = require '../../lib/router/routes'
Response = require '../../lib/response/index'
{STATUS_CODES, VIEWS} = require '../../lib/constants'


module.exports = express.Router().get routes.all, (req, res) ->
  {statusCode, body} = new Response null, {}, STATUS_CODES.OK
  return res.status(statusCode).render VIEWS.INDEX
