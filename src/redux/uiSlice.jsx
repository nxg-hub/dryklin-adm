// store/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isModalOpen: false,
  },
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closedModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closedModal } = uiSlice.actions;
export default uiSlice.reducer;
