import api from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

// Get all services from the api
export const getAllServices = createAsyncThunk("service/all", async(_, {rejectWithValue})=>{
    try{
        const { data } = await api.get("/api/services");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("An unexpected error happened.");
    }
})