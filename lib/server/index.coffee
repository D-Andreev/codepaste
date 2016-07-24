path = require 'path'
express = require 'express'
bodyParser = require 'body-parser'
cookieParser = require 'cookie-parser'
compress = require 'compression'
methodOverride = require 'method-override'


module.exports = class Singleton

  instance = null

  class Server

    init: ->
      @app = express()
      @ws = require('express-ws')(@app)

      @_setViewEngine()
      @_setBodyParser()
      @_setCookieParser()
      @_setCompression()
      @_setMethodOverride()
      
      @app.listen process.env.APP_PORT


    _setViewEngine: ->
      @app.set('views', path.join(__dirname, '../', '../', 'views'))
      @app.set('view engine', 'ejs')
      @app.use(express.static('public'))
      
      
    _setBodyParser: ->
      @app.use bodyParser.json()
      @app.use bodyParser.urlencoded extended: true


    _setCookieParser: ->
      @app.use cookieParser()


    _setCompression: ->
      @app.use compress()


    _setMethodOverride: ->
      @app.use methodOverride()

      
  @get: ->
    instance ?= new Server()
