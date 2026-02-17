import { createSlice } from "@reduxjs/toolkit";
import { getAllServices } from "./serviceThunk";

// Initial state
const initialState = {
    services: [],
    error: null,
    loading: false
}

// Service slice
const serviceSlice = createSlice({
    name: "service",
    initialState,
    extraReducers: (builder)=>{
        builder
        // All cases for the getting all services
            .addCase(getAllServices.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllServices.fulfilled, (state, action)=>{
                state.loading = false;
                state.services = action.payload.services;
            })
            .addCase(getAllServices.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload?.msg || action.payload;
            })
    }
});

export default serviceSlice.reducer;