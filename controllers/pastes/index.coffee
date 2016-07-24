Pastes = require '../../models/pastes'

module.exports = (ws, msg) ->
  q = {}
  try
    q = JSON.parse(msg)
  catch error

  Pastes.getPastes q, (err, res) ->
    ws.send JSON.stringify(res)
