express = require 'express'
routes = require '../../lib/router/routes'
Response = require '../../lib/response/index'
{STATUS_CODES} = require '../../lib/constants'
{Mail} = require '../../services'


module.exports = express.Router().post routes.contacts, (req, response) ->
  Mail.sendMail req.body, (err, res) ->
    console.log 'mail sent', err, res
    {statusCode, body} = new Response err, res, STATUS_CODES.OK
    return response.status(statusCode).send body
