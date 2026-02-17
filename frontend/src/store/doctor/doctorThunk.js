import api from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

// Fetch all the departments.
export const getAllDepartments = createAsyncThunk("doctor/department", async(_, rejectWithValue)=>{
    try{
        const {data} = await api.get("/api/doctors/department");
        return data;
    }catch(err){
        if(isAxiosError(err)){
            return rejectWithValue(err.response?.data);
        }
        return rejectWithValue("Unexpected error happend.")
    }
})