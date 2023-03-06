const Trade = require('../models/Trade');

exports.getAllTrades = async (req, res) => {
  try {
    const trades = await Trade.find().populate('portfolio').populate('stock');
    res.status(200).json({ trades, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', success: false });
  }
};
