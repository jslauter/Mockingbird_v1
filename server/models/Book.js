const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  description: {
    type: String,
    required: 'This field is required.'
  },
  quote: {
    type: String,
  },
  songs: {
    type: Array,
    required: 'This field is required.'
  },
  image: {
    type: String
  },
  category: {
    type: String,
    required: 'This field is required'
  }
});

bookSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema);