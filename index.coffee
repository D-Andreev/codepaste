Mongo = require './lib/db'
Server = require './lib/server'
Router = require './lib/router'

Mongo.get().init (err) ->
  console.log 'Connected to mongo...'
  if err
    console.log err
    process.exit();
  Server.get().init()
  Router.get().setRoutes Server.get().app

module.exports = Server.get().app
