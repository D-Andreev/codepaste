config = require './config.json'


module.exports =
  getConfig: ->
    config[process.env.ENV]
