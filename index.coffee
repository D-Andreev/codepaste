fs = require 'fs'
Mongo = require './lib/db'
Server = require './lib/server'
Router = require './lib/router'

Mongo.get().init (err) ->
  if err
    fs.writeFileSync './error-log', JSON.stringify(err)
    process.exit()
  Server.get().init()
  Router.get().setRoutes Server.get().app

module.exports = Server.get().app
