const Client = require('../models/Client');
const Portfolio = require('../models/Portfolio');

exports.addPortfolio = async (req, res) => {
  try {
    const { clientId } = req.body;
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found', success: false });
    }
    if (client.portfolio) {
      return res.status(400).json({ error: 'Client already has a portfolio', success: false });
    }
    const portfolio = new Portfolio({ client: clientId });
    client.portfolio = portfolio;
    await client.save();
    await portfolio.save();
    res.status(201).json({ message: 'Portfolio added successfully', portfolio, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', success: false });
  }
};

exports.getAllPortfolio = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().populate("client");
    res.json({ portfolios, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error', success: false });
  }
};
