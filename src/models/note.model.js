const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    trim: true
  },
  userId: {
    type: String,
    required: true,
    trim: true
  },
  files: {
    type: Array,
    default: []
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Note', NoteSchema);