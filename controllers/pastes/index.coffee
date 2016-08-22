Pastes = require '../../models/pastes'
util = require 'util'
module.exports = (ws, msg) ->
  q = null
  try
    q = JSON.parse(msg)
  catch error
    return

  console.log util.inspect q.query, false, 100, true
  Pastes.getPastes q.query, q.sort, q.pagination, (err, res, totalDocsCount) ->
    ws.send JSON.stringify {res: res, total: totalDocsCount}
