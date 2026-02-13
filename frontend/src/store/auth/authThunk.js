import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios";

import api from "@/config/api"

// Sign up thunk means calling sign up api
export  const signup = createAsyncThunk("auth/signup", async (formData, {rejectWithValue})=>{
    try{
        // Destructure the data from the api result
        const {data} = await api.post("/api/auth/register", formData);
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error occured.");
    }
});

// Login thunk means calling login api
export const login = createAsyncThunk("auth/login", async (formData, {rejectWithValue})=>{
    try{
        // Destructure the data from the api result
        const {data} = await api.post("/api/auth/login", formData);
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error occured");
    }
})

// Log out
export const logout = createAsyncThunk("auth/logout",async (_, {rejectWithValue})=>{
    try{
        const {data} = await api.post("/api/auth/logout");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error occured");
    }
});

// Google authentication
export const googleAuth = createAsyncThunk("auth/google", async (userData, {rejectWithValue})=>{
    try{
        const {data} = await api.post("/api/auth/google", userData);
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error occured");
    }
});

// Get user data like name, profile picture etc.
export const getMe = createAsyncThunk("auth/me", async (_, {rejectWithValue})=>{
    try{
        const {data} = await api.get("/api/auth/me");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error occured");
    }
})
