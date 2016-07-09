module.exports =
  BadRequestError: class BadRequestError
    constructor: (@message) -> return
  InternalServerError: class InternalServerError
    constructor: (@message) -> return
  InvalidCredentialsError: class InvalidCredentialsError
    constructor: (@message) -> return
  InvalidTokenError: class InvalidTokenError
    constructor: (@message) -> return
  NotFoundError: class NotFoundError
    constructor: (@message) -> return
  PermissionDeniedError: class PermissionDeniedError
    constructor: (@message) -> return
