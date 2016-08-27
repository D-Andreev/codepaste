Paste = require './paste'
_ = require 'lodash'

module.exports =
  getPastes: (q, sort, pagination, done) ->
    sort ?=  sort: created: -1
    pagination ?= {}
    _.merge sort, pagination
    Paste.find q, 'user.token': 0, 'user.refreshToken': 0, sort, (err, res) ->
      Paste.count {}, (err, pastesCount) ->
        done err, res, pastesCount
