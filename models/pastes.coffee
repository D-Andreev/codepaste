Paste = require './paste'
_ = require 'lodash'

module.exports =
  getPastes: (q, sort, pagination, done) ->
    sort ?=  sort: created: -1
    pagination ?= {}
    _.merge sort, pagination
    console.log('q', q, sort)
    Paste.find q, 'user.token': 0, 'user.refreshToken': 0, sort, (err, res) ->
      console.log(err, res.length);
      Paste.count {}, (err, pastesCount) ->
        done err, res, pastesCount
