import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOrder: null, // Stores the selected order data
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setSelectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});

export const { setSelectedOrder } = orderSlice.actions;
export default orderSlice.reducer;
