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
    value: 0,
  },
  reducers: {
    addNonSerializable: (state) => {
      state.nonSerializable = new Map(); // Map is non-serializable
    },
    /*
    mutateUsersDirectly: (state, action) => {
      // This line is problematic because it mutates the state.users array directly
      // by pushing a new user object. Normally Immer handles mutations, but
      // if you mutate nested non-proxied objects, middleware will catch it.
      state.users.push(action.payload); // Should be safe in RTK, so let's cause error by freezing

      // Let's freeze the users array to simulate mutation error
      Object.freeze(state.users);

      // Now mutate frozen array (will cause immutability middleware error)
      state.users.push({ id: 999, name: "Bug User", email: "bug@example.com" });
    },*/
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

export const { addNonSerializable, mutateUsersDirectly } = user.actions;
export default user.reducer;
