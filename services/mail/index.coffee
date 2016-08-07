async = require 'async'
nodemailer = require 'nodemailer'
transporter = nodemailer.createTransport "smtps://#{process.env.USER}%40gmail.com:#{process.env.PASS}@smtp.gmail.com"


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
            subject: "Codepaste message: #{opts.title}"
            text: @_getText opts

          transporter.sendMail mailOpts, next
        (response, next) ->
          mailOpts =
            from: "#{process.env.USER}@gmail.com"
            to: opts.user.email
            subject: 'Codepaste'
            text: 'Your message has been sent.'

          transporter.sendMail mailOpts, next
      ], done


    _getText: (opts) ->
      now = new Date()
      user = JSON.stringify opts.user

      "#{now} #{user} #{opts.message}"


  @get: ->
    instance ?= new Mail()
