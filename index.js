const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express();

const stockRoutes = require('./routes/stockRoutes');
const clientsRoutes = require('./routes/clientRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const tradesRoutes = require('./routes/tradesRoutes');

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

const dbURL = "mongodb+srv://taner16:taner123@cluster0.guofsiq.mongodb.net/supertrader";

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.use('/', stockRoutes);
app.use('/', clientsRoutes);
app.use('/', portfolioRoutes);
app.use('/', tradesRoutes);

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))