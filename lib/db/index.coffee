mongoose = require 'mongoose';
Config = require './config'


module.exports = class Singleton
  instance = null

  class PrivateDb

    init: ->
      # TODO: Use mongoose
      #@connection = new MySQL Config.getConfig()
      #@connection.connect()

  @get: ->
    instance ?= new PrivateDb()
