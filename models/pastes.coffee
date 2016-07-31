Paste = require './paste'
_ = require 'lodash'

module.exports =
  getPastes: (q, sort, pagination, done) ->
    sort ?=  sort: created: -1
    pagination ?= {}
    #pagination = _.merge pagination,
    #pagination.offset = pagination.skip
    #delete pagination.skip
    _.merge sort, pagination
    console.log('q', sort);
    Paste.find q, 'user.token': 0, 'user.refreshToken': 0, sort, (err, res) ->
      console.log 'err', err, res.length
      Paste.count {}, (err, pastesCount) ->
        console.log 'err2', err, pastesCount
        done err, res, pastesCount
