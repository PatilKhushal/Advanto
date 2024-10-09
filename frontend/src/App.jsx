import React, { useState, useEffect } from 'react';
import TransactionsTable from './components/TransactionsTable';
import StatisticsBox from './components/StatisticsBox';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import { Container, Typography, Select, MenuItem, TextField } from '@mui/material';

const App = () => {
    const [month, setMonth] = useState('03'); // Default to March
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

    // Debounce the searchTerm
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 500); // 300ms debounce time

        // Cleanup the timeout if searchTerm changes before the timeout is finished
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleMonthChange = (e) => {
        setMonth(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <Container>
            <Typography variant="h4" className="my-4 text-center">Product Transactions Dashboard</Typography>
            <Container>
                <div className='flex justify-center items-center gap-4'>
                    <Select
                        value={month}
                        onChange={handleMonthChange}
                        variant="outlined"
                        className="mb-4"
                    >
                        <MenuItem value="01">January</MenuItem>
                        <MenuItem value="02">February</MenuItem>
                        <MenuItem value="03">March</MenuItem>
                        <MenuItem value="04">April</MenuItem>
                        <MenuItem value="05">May</MenuItem>
                        <MenuItem value="06">June</MenuItem>
                        <MenuItem value="07">July</MenuItem>
                        <MenuItem value="08">August</MenuItem>
                        <MenuItem value="09">September</MenuItem>
                        <MenuItem value="10">October</MenuItem>
                        <MenuItem value="11">November</MenuItem>
                        <MenuItem value="12">December</MenuItem>
                    </Select>

                    {/* Search Input */}
                    <TextField
                        label="Search"
                        variant="outlined"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="mb-4"
                    />
                </div>

                {/* Pass the month and debouncedSearchTerm as props */}
                <TransactionsTable month={month} searchTerm={debouncedSearchTerm} />
            </Container>
            <StatisticsBox month={month} />
            <BarChart month={month} />
            <PieChart month={month} />
        </Container>
    );
};

export default App;