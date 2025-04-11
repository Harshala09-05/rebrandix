import { createSlice } from "@reduxjs/toolkit";

const initialStateList = {
  user: {},
  role: null,
  token: null,
  isAuthenticated: false,
  isEdit: false,
  loading: false,
  success: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateList,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
      state.error = null; // Clear errors on new request
    },
    setAuthentication: (state, action) => {
      const { isAuthenticated, role, token } = action.payload;
      state.isAuthenticated = isAuthenticated;
      state.role = role;
      state.token = token;
      state.loading = false; // ✅ THIS IS CRUCIAL
      state.error = null;
      // if (state.token) {
      //   state.isAuthenticated = true;
      // } else {
      //   state.isAuthenticated = false;
      // }
    },
    addUser: (state, action) => {
      state.user = [...state.user, action.payload];
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    updateEdit: (state) => {
      state.isEdit = !!state.isEdit;
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      state.user = updatedUser;
    },
    logoutUser: (state) => {
      state.user = {};
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
    },
  },
});

export const {
  startLoading,
  setAuthentication,
  addUser,
  setUser,
  setRole,
  updateEdit,
  updateUser,
  logoutUser,
} = userSlice.actions;

export default userSlice.reducer;