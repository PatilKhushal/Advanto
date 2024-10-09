import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const fetchCombinedData = createAsyncThunk(
  'dashboard/fetchCombinedData',
  async (month) => {
    const response = await axios.get(`${API_BASE_URL}/combined`, {
      params: { month },
    });
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    combinedData: null,
    loading: false,
    error: null,
    month: 1,
  },
  reducers: {
    setMonth: (state, action) => {
      state.month = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCombinedData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCombinedData.fulfilled, (state, action) => {
        state.loading = false;
        state.combinedData = action.payload;
      })
      .addCase(fetchCombinedData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setMonth } = dashboardSlice.actions;

export default dashboardSlice.reducer;
