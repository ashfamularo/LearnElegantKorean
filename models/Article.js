const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    level: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'public',
      enum: ['public', 'private']
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // !Change: this field should be required because the app will break if the user is not present
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model('Article', ArticleSchema)
