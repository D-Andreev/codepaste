#Mongo = require './lib/db'
Server = require './lib/server'
Router = require './lib/router'

console.log('INIT');

#Mongo.get().init()
Server.get().init()
Router.get().setRoutes Server.get().app

module.exports = Server.get().app
