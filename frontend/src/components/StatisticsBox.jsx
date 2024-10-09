import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../redux/transactionsSlice';
import { Paper, Typography } from '@mui/material';

const StatisticsBox = ({ month }) => {
    const dispatch = useDispatch();
    const statistics = useSelector((state) => state.transactions.statistics);

    useEffect(() => {
        dispatch(fetchStatistics(month));
    }, [dispatch, month]);

    if (!statistics) return null;

    return (
        <Paper className="p-4 mb-4 text-center">
            <Typography variant="h6">Total Amount: ${statistics.totalAmount}</Typography>
            <Typography variant="h6">Sold Items: {statistics.soldItems}</Typography>
            <Typography variant="h6">Unsold Items: {statistics.unsoldItems}</Typography>
        </Paper>
    );
};

export default StatisticsBox;