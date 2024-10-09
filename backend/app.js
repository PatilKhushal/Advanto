// imports
const express = require('express');
const { connectMongoDB } = require('./connection');
const cors = require('cors');
const transactionRoutes = require('./routes/transactionRoutes');
const { seedDatabase } = require('./services/seedData');
require('dotenv').config();

// initializations
const app = express();
const PORT = process.env.PORT;

// middlewares
app.use(cors());
app.use(express.json());

// connection to Local Mongo DB
connectMongoDB('mongodb://localhost:27017/Transactions')
    .then(() => {
        seedDatabase();
        console.log("Connected to DB Successfully")
    })
    .catch((error) => console.log("Connection unsuccessful due to => ", error));

app.use('/api/transactions', transactionRoutes);

// Running server on port PORT || 3000
app.listen(PORT || 3000, () => console.log(`Server running on port ${PORT}`))