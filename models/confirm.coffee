{paramValidator} = require './helpers'
{BadRequestError} = require '../lib/exceptions'
{Users} = require '../services'


module.exports =
  confirm: (email, confirmationId, done) ->
    validation = paramValidator.validateUserParams {email}
    return done new BadRequestError validation.err unless validation is true

    validation = paramValidator.validateConfirmationId confirmationId
    return done new BadRequestError validation.err unless validation is true

    Users.get().confirm email, confirmationId, done
