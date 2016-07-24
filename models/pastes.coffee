Paste = require './paste'

module.exports =
  getPastes: (q, sort, done) ->
    sort ?=  sort: created: -1
    Paste.find q, {'user.token': 0, 'user.refreshToken': 0}, sort, done
