import { createSlice } from "@reduxjs/toolkit"
import { getAllDepartments } from "./doctorThunk"

// Initial state
const initialState = {
    doctors: [],
    loading: false,
    error: null
}

// Doctor slice
const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    extraReducers: (builder)=>{
        builder
        // All cases for getting all department
            .addCase(getAllDepartments.pending, (state)=>{
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDepartments.fulfilled, (state, action)=>{
                state.loading = false;
                state.doctors = action.payload.department;
            })
            .addCase(getAllDepartments.rejected, (state, action)=>{
                state.loading = false;
                state.error = action.payload?.msg || action.payload;
            })
    }
});

export default doctorSlice.reducer;