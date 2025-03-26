import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = import.meta.env.VITE_DRYKLIN_API_BASE_URL;
const USERS_URL = import.meta.env.VITE_GET_ALL_USERS;
const AGENTS_URL = import.meta.env.VITE_GET_ALL_AGENTS;
const SERVICEPARTNER_URL = import.meta.env.VITE_GET_ALL_SERVICE_PARTNERS;

// Async thunk to fetch user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}${USERS_URL}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'no-cors'

    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch users');
    }

    return data; 
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchAgents = createAsyncThunk('user/fetchAgents', async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${AGENTS_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch Agents');
      }
  
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
  export const fetchServicePartners = createAsyncThunk('user/fetchServicePartners', async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}${SERVICEPARTNER_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        mode: 'no-cors'
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch Service Partners');
      }
  
      return data; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });
// Initial state
const initialState = {
    users: [],
    servicePartners: [],
    agents: [],
      success: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder

      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; 
        state.success = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAgents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAgents.fulfilled, (state, action) => {
        state.loading = false;
        state.agents = action.payload; 
        state.success = true;
      })
      .addCase(fetchAgents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchServicePartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServicePartners.fulfilled, (state, action) => {
        state.loading = false;
        state.servicePartners = action.payload; 
        state.success = true;
      })
      .addCase(fetchServicePartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut } = userSlice.actions;
export default userSlice.reducer;
