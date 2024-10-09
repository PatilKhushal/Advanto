import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../redux/transactionsSlice';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer, Pagination, Button, Select, MenuItem } from '@mui/material';

const TransactionsTable = ({ month, searchTerm }) => {
    const dispatch = useDispatch();
    const transactions = useSelector((state) => state.transactions.transactions);
    const totalCount = useSelector((state) => state.transactions.totalCount);
    const statusMain = useSelector((state) => state.transactions.status);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(3);

    useEffect(() => {
        dispatch(fetchTransactions({ month, search: searchTerm, page, limit }));
    }, [dispatch, month, searchTerm, page, limit]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
        setPage(1); // Reset to the first page when limit changes
    };

    if (statusMain === 'loading') return <div>Loading...</div>;
    if (statusMain === 'failed') return <div>Failed to load data</div>;

    return (
        <TableContainer component={Paper} className="mb-4">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Date of Sale</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Sold</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map?.((transaction) => (
                        <TableRow key={transaction._id}>
                            <TableCell>{transaction.title}</TableCell>
                            <TableCell>{transaction.description}</TableCell>
                            <TableCell>{transaction.price}</TableCell>
                            <TableCell>{transaction.dateOfSale}</TableCell>
                            <TableCell>{transaction.category}</TableCell>
                            <TableCell>{transaction.sold ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Pagination Controls */}
            <div className='flex justify-between items-center m-4'>
            <span style={{ margin: '0 10px' }}>Page {page} of {Math.ceil(totalCount / limit)}</span>

                {/* Next and Previous Buttons */}
                <div>
                    <Button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(totalCount / limit)))}
                        disabled={page === Math.ceil(totalCount / limit)}
                    >
                        Next
                    </Button>
                </div>

                {/* Per Page Selector */}
                <Select value={limit} onChange={handleLimitChange} variant="outlined" style={{ marginLeft: '16px' }}>
                    <MenuItem value={3}>3 per page</MenuItem>
                    <MenuItem value={5}>5 per page</MenuItem>
                    <MenuItem value={10}>10 per page</MenuItem>
                    <MenuItem value={20}>20 per page</MenuItem>
                </Select>
            </div>
        </TableContainer>
    );
};

export default TransactionsTable;