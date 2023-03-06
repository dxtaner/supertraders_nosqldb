const Client = require('../models/Client');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Client.find().populate("portfolio");
    res.status(200).json({ user: users, success: true });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
};

exports.createUser = async (req, res) => {
  try {
    const newUser = new Client({
      username: req.body.username,
      balance: req.body.balance
    });
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser, success: true });
  } catch (error) {
    res.status(400).json({ error: error.message, success: false });
  }
};
