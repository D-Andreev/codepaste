async = require 'async'
email = require 'emailjs'
server  = email.server.connect({
  user:    process.env.USER,
  password: process.env.PASS,
  host:    'smtp.gmail.com',
  ssl:     true
});

module.exports = class Singleton
  instance = null

  class Mail

    send: (opts, done) ->
      return done new Error() unless opts.user and opts.message and opts.title

      async.waterfall [
        (next) =>
          mailOpts =
            from: process.env.USER
            to: "#{process.env.USER}@gmail.com"
            subject: "Codepaste: #{opts.title}"
            text: @_getText opts

          server.send mailOpts, next
        (response, next) ->
          mailOpts =
            from: "#{process.env.USER}@gmail.com"
            to: opts.user.user.email
            subject: 'Codepaste'
            text: 'Your message has been sent.'

          server.send mailOpts, next
      ], done


    _getText: (opts) ->
      now = new Date()
      user = JSON.stringify opts.user

      "#{now} #{user} #{opts.message}"


  @get: ->
    instance ?= new Mail()
