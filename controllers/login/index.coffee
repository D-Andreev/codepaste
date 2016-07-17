express = require 'express'
routes = require '../../lib/router/routes'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'
Users = require '../../services/users'

module.exports = express.Router().post routes.login, (req, res) ->
  Users.get().login req.body, (err, result) ->
    {statusCode, body} = new Response err, result, STATUS_CODES.OK
    return res.status(statusCode).json body
