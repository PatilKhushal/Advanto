const mongoose = require('mongoose');
const Transaction = require('../models/Transaction'); // Replace with your model
const { getSeedingData } = require('./getSeedingData');

async function seedDatabase() {
  try {
    const count = await Transaction.countDocuments(); // Check if there are any documents
    if (count === 0) {
      // Seed data if no documents are found
      const data = await getSeedingData();
      await Transaction.insertMany(data);
      console.log('Database seeded');
    } else {
      console.log('Database already seeded');
    }
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

module.exports = {
    seedDatabase
}