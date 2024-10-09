import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPieData } from '../redux/transactionsSlice';
import { Pie } from 'react-chartjs-2';
import { Paper } from '@mui/material';

const PieChart = ({ month }) => {
    const dispatch = useDispatch();
    const pieData = useSelector((state) => state.transactions.pieData);

    useEffect(() => {
        dispatch(fetchPieData(month));
    }, [dispatch, month]);

    const data = {
        labels: pieData.map?.((item) => item.category),
        datasets: [
            {
                data: pieData.map?.((item) => item.count),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40', '#4BC0C0'],
            },
        ],
    };

    return (
        <Paper className="w-1/2 m-auto">
            <Pie data={data} />
        </Paper>
    );
};

export default PieChart;