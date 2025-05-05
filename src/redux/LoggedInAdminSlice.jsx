import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const email = localStorage.getItem("userEmail");

export const fetchAdminDetails = createAsyncThunk(
  "admin/fetchAdminDetails",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${
          import.meta.env.VITE_GET_USER_BY_EMAIL
        }?email=${email}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch admin details");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    adminDetails: null,
    loading: false,
    error: null,
  },
  reducers: {
    resetAdmin(state, action) {
      state.adminDetails = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.adminDetails = action.payload;
      })
      .addCase(fetchAdminDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetAdmin } = adminSlice.actions;
export default adminSlice.reducer;
