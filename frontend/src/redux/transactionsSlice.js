import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
    transactions: [],
    totalCount : 0,
    statistics: null,
    barData: [],
    pieData: [],
    status: 'idle',
};

// Slice creation
const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        setTransactions: (state, action) => {
            state.transactions = action.payload.transactions;
            state.totalCount = action.payload.totalCount; // Update total count
            console.log("action.payload.totalCount : " + action.payload.totalCount)
            state.status = 'succeeded';
        },
        setStatistics: (state, action) => {
            state.statistics = action.payload;
        },
        setBarData: (state, action) => {
            state.barData = action.payload;
        },
        setPieData: (state, action) => {
            state.pieData = action.payload;
        },
        setStatus: (state, action) => {
            state.status = action.payload;
        },
        resetState: (state) => {
            return initialState;
        },
    },
});

export const { setTransactions, setStatistics, setBarData, setPieData, setStatus, resetState } = transactionsSlice.actions;

export default transactionsSlice.reducer;

// Async actions
export const fetchTransactions = ({month, search, page, limit = 3}) => async (dispatch) => {
    dispatch(setStatus('loading'));
    try {
        const response = await axios.get(`http://localhost:5000/api/transactions/transactions?month=${month}&search=${search}&page=${page}&limit=${limit}`);
        dispatch(setTransactions(await response.data));
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        dispatch(setStatus('failed'));
    }
};

export const fetchStatistics = (month) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/transactions/statistics?month=${month}`);
        dispatch(setStatistics(await response.data));
    } catch (error) {
        console.error('Failed to fetch statistics:', error);
    }
};

export const fetchBarData = (month) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/transactions/bar-data?month=${month}`);
        dispatch(setBarData(await response.data));
    } catch (error) {
        console.error('Failed to fetch bar chart data:', error);
    }
};

export const fetchPieData = (month) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/transactions/pie-data?month=${month}`);
        dispatch(setPieData(await response.data));
    } catch (error) {
        console.error('Failed to fetch pie chart data:', error);
    }
};