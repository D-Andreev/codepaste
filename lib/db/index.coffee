mongoose = require 'mongoose';
Config = require './config'


module.exports = class Singleton
  instance = null

  class PrivateMySQL

    init: ->
      @connection = new MySQL Config.getConfig()
      @connection.connect()

  @get: ->
    instance ?= new PrivateMySQL()
