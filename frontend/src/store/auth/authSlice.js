import { createSlice } from "@reduxjs/toolkit";
import { getMe, googleAuth, login, logout, signup } from "./authThunk";

// Initial state for the auth slice
const initialState = {
  user: null,
  message: null,
  error: null,
  loading : true,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder)=>{
    builder
    // Login cases
      .addCase(login.pending, (state)=>{
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(login.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.message = action.payload.msg;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload?.msg || action.payload;
        state.isAuthenticated = false;
      })

      // Sign up cases
      .addCase(signup.pending, (state)=>{
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(signup.fulfilled, (state, action)=>{
        state.loading = false;
        state.message = action.payload.msg;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(signup.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload?.msg || action.payload;
        state.isAuthenticated = false;
      })

      // Log out Cases
      .addCase(logout.pending, (state)=>{
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(logout.fulfilled, (state, action)=>{
        state.loading = false;
        state.message = action.payload.msg;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload?.msg || action.payload;
      })

      // Google auth cases
      .addCase(googleAuth.pending, (state)=>{
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(googleAuth.fulfilled, (state, action)=>{
        state.loading = false;
        state.message = action.payload.msg;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(googleAuth.rejected, (state, action)=>{
        state.loading = false;
        state.error = action.payload?.msg || action.payload;
        state.user = null;
        state.isAuthenticated = false;
      })

      // Get some user data
      .addCase(getMe.pending, (state)=>{
        state.error = null;
        state.loading = true;
        state.message = null;
      })
      .addCase(getMe.fulfilled, (state, action)=>{
        state.loading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getMe.rejected, (state)=>{
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
  }
})

export default authSlice.reducer;