const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    match: /^[A-Z]{3}$/
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    max: 9999.99,
    validate: {
      validator: function(v) {
        return Number(v).toFixed(2) === v.toString();
      },
      message: props => `${props.value} is not a valid price!`
    }
  }
});

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
