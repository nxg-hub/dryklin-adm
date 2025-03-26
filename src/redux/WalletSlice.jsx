import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;

export const fetchWalletDetails = createAsyncThunk(
    "wallet/fetchWalletDetails",
    async (walletId, { rejectWithValue }) => {
      try {
        const response = await fetch(
          `${API_BASE_URL}${import.meta.env.VITE_GET_WALLET_BY_ID}?walletId=${walletId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch wallet details");
        }
  
        return { walletId, balance: data.balance.amount }; // Store balance by walletId
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  const walletSlice = createSlice({
    name: "wallet",
    initialState: {
      walletBalances: {},
      loading: false,
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchWalletDetails.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchWalletDetails.fulfilled, (state, action) => {
          state.loading = false;
          state.walletBalances[action.payload.walletId] = action.payload.balance;
        })
        .addCase(fetchWalletDetails.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export default walletSlice.reducer;
  