const mongoose = require('mongoose')

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
)

module.exports = mongoose.model('Card', schema)
