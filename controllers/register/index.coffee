express = require 'express'
routes = require '../../lib/router/routes'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'
Users = require '../../services/users'

module.exports = express.Router().put routes.register, (req, res) ->
  console.log('body', typeof req.body, req.body);
  Users.get().register req.body, (err, result) ->
    {statusCode, body} = new Response err, result, STATUS_CODES.OK
    return res.json body
