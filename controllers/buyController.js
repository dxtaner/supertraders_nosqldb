const Trade = require('../models/Trade');
const Portfolio = require('../models/Portfolio');
const Stock = require('../models/Stock');
const Client = require('../models/Client');

exports.buyShare = async (req, res) => {
  try {
    const { portfolioId, stockId, quantity } = req.body;

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found', success: false });
    }

    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found', success: false });
    }

    if (quantity <= 0) {
      return res.status(400).send({ message: "Quantity must be positive number", success: false });
    }

    const totalPrice = (stock.price * quantity).toFixed(2);
    const client = await Client.findById(portfolio.client);

    if (client.balance < totalPrice) {
      return res.status(400).json({ error: 'insufficient balance', success: false });
    }

    client.balance = (parseFloat(client.balance) - parseFloat(totalPrice)).toFixed(2);
    await client.save();

    const trade = new Trade({
      portfolio: portfolioId,
      stock: stockId,
      type: 'BUY',
      quantity,
      totalPrice: totalPrice,
      date: Date.now(),
    });

    await trade.save();

    res.status(201).json({ message: 'Trade created successfully', trade, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', success: false });
  }
};
