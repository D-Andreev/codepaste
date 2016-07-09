request = require 'request'
_ = require 'lodash'
{expect} = require 'chai'

statusCode = 0
result = null


module.exports = ->

  @When /^I login with$/, (credentials, done) ->
    request
