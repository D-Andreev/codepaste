Pastes = require '../../models/pastes'

module.exports = (ws, msg) ->
  q = {}
  try
    q = JSON.parse(msg)
  catch error

  Pastes.getPastes q, (err, res) ->
    console.log 'res', res.length
    ws.send JSON.stringify(res)
