import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError, isAxiosError } from "axios";

import api from "@/config/api"

// Sign up thunk means calling sign up api
export  const signup = createAsyncThunk("auth/signup", async (formData, {rejectWithValue})=>{
    try{
        // Destructure the data from the api result
        const {data} = api.post("/api/auth/register", formData);
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data || "Failed to registered, Try again.");
        }
        return rejectWithValue("An unexpected error occured.");
    }
});

// Login thunk means calling login api
export const login = createAsyncThunk("auth/login", async (formData, {rejectWithValue})=>{
    try{
        // Destructure the data from the api result
        const {data} = api.post("/api/auth/login", formData);
        return data;
    }catch(err){
        if(AxiosError(err)){
            return rejectWithValue(err.response?.data || "Failed to login, try again");
        }
        return rejectWithValue("An unexpected error occured");
    }
})


