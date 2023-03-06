const Stock = require('../models/Stock');

exports.createStock = async (req, res) => {
  try {
    const { symbol, price } = req.body;
    const stock = new Stock({ symbol, price });
    await stock.save();
    res.status(201).json({ message: 'Stock created successfully', stock: stock, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error',success: false  });
  }
};

exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json({ stocks ,success:true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error',success:false });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;
    const updatedStock = await Stock.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );
    if (!updatedStock) {
      return res.status(404).json({ error: 'Stock not found', success: false });
    }
    res.status(200).json({ message: 'Stock updated successfully', stock: updatedStock, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', success: false });
  }
  
};
