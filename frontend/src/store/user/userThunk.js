import api from "@/config/api"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios";

// Get the patient details.
export const getPatientDetail = createAsyncThunk("user/me", async (_, {rejectWithValue})=>{
    try{
        const {data} = await api.get("/api/users/me");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error happened.");
    }
});

// Update profile photo
export const updateAvatar = createAsyncThunk("user/avatar", async (_, {rejectWithValue})=>{
    try{
        const {data} = await api.patch("/api/users/avatar");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error happened.");
    }
});

// Update patient profile detail
export const updateProfile = createAsyncThunk("user/profile", async (_, {rejectWithValue})=>{
    try{
        const {data} = await api.patch("/api/users/edit");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error happened.");
    }
});