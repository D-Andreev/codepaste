mongoose = require 'mongoose'

pasteSchema = mongoose.Schema({
  title: String
  user: Object
  created: { type: Date, default: Date.now }
  code: String
  mode: String
});

module.exports = mongoose.model('Paste', pasteSchema)

