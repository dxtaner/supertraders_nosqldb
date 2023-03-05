const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  portfolio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Portfolio',
    required: true,
  },
  stock: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Stock',
    required: true,
  },
  type: {
    type: String,
    enum: ['BUY', 'SELL'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min:1
  },
  totalPrice: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Trade = mongoose.model('Trade', tradeSchema);

module.exports = Trade;
