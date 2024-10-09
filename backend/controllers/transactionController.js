const asyncHandler = require('express-async-handler');
const Transaction = require('../models/Transaction');

// @desc    Fetch all transactions
// @route   GET /api/transactions
// @access  Public
const getTransactions = asyncHandler(async (req, res) => {
    const { month, search = '', page = 1, limit = 10 } = req.query;

    const monthNumber = parseInt(month, 10);

    const query = {
        $expr: {
            $eq: [{ $month: "$dateOfSale" }, monthNumber]
        },
        title: { $regex: search, $options: 'i' }
    };

    // Fetch total count of documents matching the query
    const totalCount = await Transaction.countDocuments(query);

    // Fetch paginated transactions
    const transactions = await Transaction.find(query)
        .limit(limit)
        .skip((page - 1) * limit);

    return res.json({ transactions, totalCount });
});

// @desc    Get statistics for a month
// @route   GET /api/statistics
// @access  Public
const getStatistics = asyncHandler(async (req, res) => {
    const { month } = req.query;

    const monthNumber = parseInt(month, 10);

    const totalAmount = await Transaction.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            }
        },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$price' },
                soldItems: { $sum: { $cond: ['$sold', 1, 0] } },
                unsoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
            }
        }
    ]);

    return res.json(totalAmount[0]);
});

// @desc    Get bar chart data
// @route   GET /api/bar-data
// @access  Public
const getBarChartData = asyncHandler(async (req, res) => {
    const { month } = req.query;

    const monthNumber = parseInt(month, 10);

    const priceRanges = [
        { $gte: 0, $lt: 100 },
        { $gte: 100, $lt: 200 },
        { $gte: 200, $lt: 300 },
        { $gte: 300, $lt: 400 },
        { $gte: 400, $lt: 500 },
        { $gte: 500, $lt: 600 },
        { $gte: 600, $lt: 700 },
        { $gte: 700, $lt: 800 },
        { $gte: 800, $lt: 900 },
        { $gte: 900 },
    ];

    const barData = await Promise.all(priceRanges.map(range =>
        Transaction.countDocuments({
            $expr: {
                $eq: [{ $month: "$dateOfSale" }, monthNumber]
            },
            price: range
        })
    ));

    return res.json(barData);
});

// @desc    Get pie chart data
// @route   GET /api/pie-data
// @access  Public
const getPieChartData = asyncHandler(async (req, res) => {
    const { month } = req.query;

    const monthNumber = parseInt(month, 10);

    const pieData = await Transaction.aggregate([
        {
            $match: {
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, monthNumber]
                }
            }
        },
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        }
    ]);

    return res.json(pieData.map(item => ({ category: item._id, count: item.count })));
});

module.exports = { getTransactions, getStatistics, getBarChartData, getPieChartData };