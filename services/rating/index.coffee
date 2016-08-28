{MAX_NUMBER_OF_VOTES} = require '../../lib/constants'

module.exports = class Singleton
  instance = null

  class Rating

    vote: (email, paste, rating) ->
      if paste.votes.length is 0
        paste.votes.push @_getVote email, rating
        paste.votesSum += rating
        paste.rating = rating
        paste

      paste.votes.push @_getVote paste, rating
      paste.votesSum += rating
      paste.rating = @_getRating votesSum
      paste


    _getVote: (email, rating) ->
      email: email, vote: rating


    _getRating: (votesSum) ->
      parseFloat (votesSum / MAX_NUMBER_OF_VOTES).toFixed(2)
      

  @get: ->
    instance ?= new Rating()

