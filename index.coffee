#Mongo = require './lib/db'
Server = require './lib/server'
Router = require './lib/router'

#Mongo.get().init()
Server.get().init()
Router.get().setRoutes Server.get().app

module.exports = Server.get().app
