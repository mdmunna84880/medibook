import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  user: {},
  message: null,
  error: false,
  loading : false,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers:{},
  extraReducers: {
    
  }
})

export default authSlice.reducer;