mongoose = require 'mongoose'
config = require './config.json'
mongoose = require 'mongoose'


module.exports = class Singleton

  instance = null

  class PrivateDb

    init: (done) ->
      mongoose.connect 'mongodb://localhost/codepaste'
      @db = mongoose.connection
      @db.on 'error', (error) -> done error
      @db.on 'open', done

  @get: ->
    instance ?= new PrivateDb()
