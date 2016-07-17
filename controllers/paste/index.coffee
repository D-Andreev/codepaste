express = require 'express'
_ = require 'lodash'
routes = require '../../lib/router/routes'
Paste = require '../../models/paste'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'

module.exports = express.Router().get routes.paste, (req, res) ->
  id = _.last req.url.split '='
  console.log('id', id);
  Paste.findOne {_id: id}, (err, paste) ->
    delete paste.user.refreshToken
    delete paste.user.token
    delete paste.user.user.email
    delete paste.value
    paste.user = paste.user.user
    console.log('saved', err, paste)
    {statusCode, body} = new Response err, paste, STATUS_CODES.OK
    return res.status(statusCode).json body
