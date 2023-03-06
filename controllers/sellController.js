const Trade = require('../models/Trade');
const Stock = require('../models/Stock');
const Client = require('../models/Client');
const Portfolio = require('../models/Portfolio');

exports.sellTrade = async (req, res) => {
  try {
    const { portfolioId, stockId, quantity } = req.body;

    const stock = await Stock.findById(stockId);
    if (!stock) {
      return res.status(404).json({ error: 'Stock not found', success: false });
    }

    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found', success: false });
    }

    const trades = await Trade.find({ portfolio: portfolioId, stock: stockId }).sort({ date: 'asc' });
    if (!trades || trades.length === 0) {
      return res.status(400).json({ error: 'No trades found for the given portfolio and stock', success: false });
    }

    let boughtQuantity = 0;
    let soldQuantity = 0;
    for (const trade of trades) {
      if (trade.type === 'BUY') {
        boughtQuantity += trade.quantity;
      } else if (trade.type === 'SELL') {
        soldQuantity += trade.quantity;
      }
    }

    const availableQuantity = boughtQuantity - soldQuantity;
    if (quantity > availableQuantity) {
      return res.status(400).json({ error: 'Insufficient quantity to sell', success: false });
    }
    
    const totalPrice = (stock.price * quantity).toFixed(2);
    const client = await Client.findById(portfolio.client);
    client.balance = (parseFloat(client.balance) + parseFloat(totalPrice)).toFixed(2);

    await client.save();

    const trade = new Trade({
      portfolio: portfolioId,
      stock: stockId,
      type: 'SELL',
      quantity,
      totalPrice,
      date: Date.now(),
    });

    await trade.save();

    res.status(201).json({ message: 'Trade created successfully', trade, success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', success: false });
  }
};

