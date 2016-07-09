{BadRequestError, NotFoundError, InvalidTokenError, PermissionDeniedError} = require '../exceptions'
{STATUS_CODES, ENVIRONMENTS} = require '../constants'


module.exports = class Response
  statusCode: null
  body: null

  constructor: (err, body, successStatusCode) ->
    if err
      if err instanceof BadRequestError
        @statusCode = STATUS_CODES.BAD_REQUEST
        @body = err.message
      else if err instanceof NotFoundError
        @statusCode = STATUS_CODES.NOT_FOUND
        @body = err.message
      else if err instanceof InvalidTokenError
        @statusCode = STATUS_CODES.UNAUTHORIZED
        @body = err.message
      else if err instanceof PermissionDeniedError
        @statusCode = STATUS_CODES.PERMISSION_DENIED
        @body = err.message
      else
        @statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR
        @body = err.message unless process.env.ENV is ENVIRONMENTS.PRODUCTION

      return

    @body = body
    @statusCode = successStatusCode
