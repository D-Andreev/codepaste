mongoose = require 'mongoose'

pasteSchema = mongoose.Schema({
  title: String
  user: Object
  created: {type: Date, default: Date.now}
  code: String
  mode: String
  rating: {type: Number, default: 0}
  votes: {type: Array, default: []}
  votesSum: {type: Number, default: 0}
})

module.exports = mongoose.model('Paste', pasteSchema)
