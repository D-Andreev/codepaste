_ = require 'lodash'
Pastes = require '../../models/pastes'
{STATUS_CODES} = require '../../lib/constants'

module.exports = (ws, msg) ->
  q = {}
  q = JSON.parse(msg) if msg and _.isObject(msg)
  Pastes.getPastes q, (err, res) ->
    ws.send JSON.stringify(res);



