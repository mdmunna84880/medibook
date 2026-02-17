import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { getPatientDetail, updateAvatar, updateProfile } from "./userThunk"

// Initial state
const initialState = {
    user: {},
    loading: false,
    error: null
}

// All user thunk
const userThunk = [getPatientDetail, updateAvatar, updateProfile];

// User slice
const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers:(builder)=>{
        builder
            // Fullfield case for getPatientDetail
            .addCase(getPatientDetail.fulfilled, (state, action)=>{
                state.user = action.payload.user;
            })
            // Common pending cases for all the thunk
            .addMatcher(isPending(...userThunk), (state)=>{
                state.error = null;
                state.loading = true;
            })
            // Common rejected cases for all the thunk
            .addMatcher(isRejected(...userThunk), (state, action)=>{
                state.loading = false;
                state.error = action.payload?.msg || action.payload;
            })
            // Common fullfield cases for all the thunk
            .addMatcher(isFulfilled(...userThunk), (state)=>{
                state.loading = false;
            })
    }
})

export default userSlice.reducer;