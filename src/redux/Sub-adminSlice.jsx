import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const SUBADMINS_URL = import.meta.env.VITE_GET_ALL_SUB_ADMINS;

const token = localStorage.getItem("token");

export const fetchSubAdmins = createAsyncThunk(
  "user/fetchSubAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${SUBADMINS_URL}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch Subadmins");
      }

      return Array.isArray(data.data) ? data.data : [];
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  selectedSubadmin: null,
  subadmins: [],
  loading: false,
  error: null,
};

const subadminSlice = createSlice({
  name: "subadmin",
  initialState,
  reducers: {
    setSubadmins: (state, action) => {
      state.subadmins = action.payload; // ✅ Only store the data array
    },
    setSelectedSubadmin: (state, action) => {
      const { userId, data } = action.payload;
      state.selectedSubadmin =
        state.subadmins.find((u) => u.id === userId) || data || null;
    },
    resetSubadmin(state, action) {
      state.subadmins = [];
      state.selectedSubadmin = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchSubAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.subadmins = action.payload;
        state.success = true;
      })
      .addCase(fetchSubAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSubadmins, setSelectedSubadmin, resetSubadmin } =
  subadminSlice.actions;
export default subadminSlice.reducer;
