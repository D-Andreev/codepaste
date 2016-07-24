express = require 'express'
_ = require 'lodash'
routes = require '../../lib/router/routes'
Paste = require '../../models/paste'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'
Tokens = require '../../services/tokens'

module.exports = express.Router().get routes.paste, (req, res) ->
  Tokens.get().validate req, res, (err, result) ->
    return res.status(STATUS_CODES.UNAUTHORIZED).json {} if err or result.statusCode == 401

    id = _.last req.url.split '/'
    return res.status(STATUS_CODES.BAD_REQUEST).json {} unless id

    Paste.findOne {_id: id}, (err, paste) ->
      if not paste or not paste.user
        return res.status(STATUS_CODES.NOT_FOUND).json {}

      delete paste.user.refreshToken
      delete paste.user.token
      delete paste.user.user.email
      delete paste.value
      paste.user = paste.user.user
      {statusCode, body} = new Response err, paste, STATUS_CODES.OK
      return res.status(statusCode).json body
