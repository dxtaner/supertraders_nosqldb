const Client = require('../models/Client');
const Portfolio = require('../models/Portfolio');
const Stock = require('../models/Stock');

const clients = [
  { username: 'client1', balance: 10000 },
  { username: 'client2', balance: 5000 },
  { username: 'client3', balance: 25000 },
  { username: 'client4', balance: 2000 },
  { username: 'client5', balance: 15000 }
];

const portfolios = clients.flatMap(client => {
  return [...Array(5)].map((_, i) => {
    return { client: client._id };
  });
});

const stocks = [...Array(10)].map((_, i) => {
  return { name: `Stock ${i}`, price: Math.floor(Math.random() * 100) + 1 };
});

async function initializeDatabase() {
  try {
    const clientResult = await Client.bulkWrite(clients.map(client => {
      return {
        insertOne: {
          document: client
        }
      };
    }));

    console.log(`${clientResult.insertedCount} clients inserted`);

    const portfolioResult = await Portfolio.bulkWrite(portfolios.map(portfolio => {
      return {
        insertOne: {
          document: portfolio
        }
      };
    }));

    console.log(`${portfolioResult.insertedCount} portfolios inserted`);

    const stockResult = await Stock.bulkWrite(stocks.map(stock => {
      return {
        insertOne: {
          document: stock
        }
      };
    }));

    console.log(`${stockResult.insertedCount} stocks inserted`);
  } catch (err) {
    console.error(err);
  }
}

initializeDatabase();
