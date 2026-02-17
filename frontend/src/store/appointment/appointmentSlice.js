import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { bookAppointment, getAllAppointments, getAllDistinctYear } from "./appointmentThunk"

// Initial state
const initialState = {
    appointments: [],
    yearsWithId: [],
    loading: false,
    isError: false,
    message: null
}

// All thunk
const appointmentThunk = [bookAppointment, getAllAppointments, getAllDistinctYear];

// Appointment slice
const appointmentSlice = createSlice({
    name: "appointment",
    initialState,
    extraReducers: (builder)=>{
        builder
            // Specfic fullfilled case for the getAllAppointment
            .addCase(getAllAppointments.fulfilled, (state, action)=>{
                state.appointments = action.payload.appointments;
            })
            // Specfic fullfilled case for the getAllDistinctYear
            .addCase(getAllDistinctYear.fulfilled, (state, action)=>{
                state.yearsWithId=action.payload.yearsWithId;
            })
            // Common pending cases for all the thunk
            .addMatcher(isPending(...appointmentThunk), (state)=>{
                state.isError = false;
                state.loading = true;
                state.message = null;
            })
            // Common rejected cases for all the thunk
            .addMatcher(isRejected(...appointmentThunk), (state, action)=>{
                state.loading = false;
                state.isError = true;
                state.message = action.payload?.msg || action.payload
            })
            // Common fullfilled cases for all the thunk
            .addMatcher(isFulfilled(...appointmentThunk), (state)=>{
                state.loading = false;
                state.isError = false;
                state.message = null;
            })
    }   
});

export default appointmentSlice.reducer;