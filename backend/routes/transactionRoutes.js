const express = require('express');
const router = express.Router();
const {
    getTransactions,
    getStatistics,
    getBarChartData,
    getPieChartData
} = require('../controllers/transactionController');

router.get('/transactions', getTransactions);
router.get('/statistics', getStatistics);
router.get('/bar-data', getBarChartData);
router.get('/pie-data', getPieChartData);

module.exports = router;