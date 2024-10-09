import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBarData } from '../redux/transactionsSlice';
import { Bar } from 'react-chartjs-2';
import { Paper } from '@mui/material';

const BarChart = ({ month }) => {
    const dispatch = useDispatch();
    const barData = useSelector((state) => state.transactions.barData);

    useEffect(() => {
        dispatch(fetchBarData(month));
    }, [dispatch, month]);

    const data = {
        labels: ['$0-100', '$100-200', '$200-300', '$300-400', '$400-500', '$500-600', '$600-700', '$700-800', '$800-900', '$900+'],
        datasets: [
            {
                label: 'Total Products',
                data: barData,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    return (
        <Paper className="p-4 mb-4">
            <Bar data={data} />
        </Paper>
    );
};

export default BarChart;