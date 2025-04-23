import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const ORDERS_PLACED_STATS_URL = import.meta.env
  .VITE_GET_ORDERS_PLACED_PER_MONTH;
const PROFILE_UPDATE_STATS_URL = import.meta.env.VITE_PROFILE_UPDATES_PER_MONTH;
const NEW_USERS_STATS = import.meta.env.VITE_GET_NEW_USERS_STATS;
const COMPLETED_ORDERS_URL = import.meta.env.VITE_GET_COMPLETED_ORDERS;
const LOGIN_STATS = import.meta.env.VITE_GET_MONTHLY_LOGIN;
const CANCELLED_ORDERS_URL = import.meta.env.VITE_GET_CANCELLED_ORDERS;

// Async thunks to fetch stats
export const fetchMonthlyOrders = createAsyncThunk(
  "orders/fetchMonthlyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${ORDERS_PLACED_STATS_URL}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch Monthly Orders");
      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProfileUpdate = createAsyncThunk(
  "profile/fetchProfileUpdate",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}${PROFILE_UPDATE_STATS_URL}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch profile update");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyLogin = createAsyncThunk(
  "login/fetchLogin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${LOGIN_STATS}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile update");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyCompletedOrders = createAsyncThunk(
  "completedOrders/fetchCompletedOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${COMPLETED_ORDERS_URL}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile update");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyCancelledOrders = createAsyncThunk(
  "cancelledOrders/fetchCancelledOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${CANCELLED_ORDERS_URL}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile update");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMonthlyNewUsers = createAsyncThunk(
  "newUsers/fetchnewUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${NEW_USERS_STATS}`, {
        method: "GET",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch profile update");
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    monthlyOrders: [],
    profileUpdate: [],
    monthlyLogin: [],
    completedOrders: [],
    cancelledOrders: [],
    newUsers: [],
    loading: false,
    error: false,
  },
  reducers: {
    resetAnalytics(state) {
      state.monthlyOrders = [];
      state.profileUpdate = [];
      state.monthlyLogin = [];
      state.completedOrders = [];
      state.cancelledOrders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyOrders = action.payload;
      })
      .addCase(fetchMonthlyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProfileUpdate.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfileUpdate.fulfilled, (state, action) => {
        state.loading = false;
        state.profileUpdate = action.payload;
      })
      .addCase(fetchProfileUpdate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonthlyLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.monthlyLogin = action.payload;
      })
      .addCase(fetchMonthlyLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonthlyCompletedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyCompletedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.completedOrders = action.payload;
      })
      .addCase(fetchMonthlyCompletedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonthlyCancelledOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyCancelledOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.cancelledOrders = action.payload;
      })
      .addCase(fetchMonthlyCancelledOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchMonthlyNewUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMonthlyNewUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.newUsers = action.payload;
      })
      .addCase(fetchMonthlyNewUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { resetAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
