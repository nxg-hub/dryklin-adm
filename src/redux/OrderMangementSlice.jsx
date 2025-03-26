// Slice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: false,
  success: false,
};
const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const ORDERS_URL = import.meta.env.VITE_ORDERMANAGEMENT_ENDPOINT;
export const fetchOrders = createAsyncThunk(
  "orders/fecthOrders",

  async (_, { rejectWithValue }) => {
    try {
      return await fetch(`${API_BASE_URL}${ORDERS_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          return data;
        });
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);
const orderManagementSlice = createSlice({
  name: "orderManagement",
  initialState,
  reducers: {
    resetOrders(state, action) {
      state.orders = [];
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.success = true;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.orders = [];
        state.success = false;
      });
  },
});

export const { resetOrders } = orderManagementSlice.actions;
export default orderManagementSlice.reducer;
