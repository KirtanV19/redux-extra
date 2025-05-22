import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../API/api";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
});

const user = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: null,
    lastUpdated: null,
    nonSerializable: null,
  },
  reducers: {
    addNonSerializable: (state) => {
      state.nonSerializable = new Map(); // Map is non-serializable
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.lastUpdated = Date.now();
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addNonSerializable } = user.actions;
export default user.reducer;
