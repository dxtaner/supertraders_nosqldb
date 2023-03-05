const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 20
  },
  balance: {
    type: Number,
    required: true,
    default: 1000.00
  },
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio'
  }
});

module.exports = mongoose.model('Client', clientSchema);
