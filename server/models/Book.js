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
    type: String,
  },
});

bookSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//bookSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Book', bookSchema);