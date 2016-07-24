Paste = require './paste'

module.exports =
  getPastes: (q, done) ->
    q ?= {}
    Paste.find q, {'user.token': 0, 'user.refreshToken': 0}, {sort: {created: -1}}, done
