express = require 'express'
routes = require '../../lib/router/routes'
Paste = require '../../models/paste'
Rating = require '../../services/rating'
{STATUS_CODES} = require '../../lib/constants'

module.exports = express.Router().post routes.rating, (req, res) ->
  unless req.body.user or req.body.paste or req.body.rating
    return res.status(STATUS_CODES.BAD_REQUEST).json {}

  Paste.findOne {_id: req.body.paste._id}, (err, paste) ->
    if not paste or not paste.user
      return res.status(STATUS_CODES.NOT_FOUND).json {}
  
    paste = Rating.get().vote req.body.user.user.email, req.body.paste, req.body.rating
    res.status(STATUS_CODES.OK).json {}
