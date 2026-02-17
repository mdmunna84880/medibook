/** @format */

import api from "@/config/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";

// Get all apointment of the patients
export const getAllAppointments = createAsyncThunk(
  "appointment/all",
  async (year, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/appointments", {
        params: year ? { year } : {},
      });
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue("An unexpected error happened.");
    }
  },
);

// Get all the distinct year the user booke the appointment.
export const getAllDistinctYear = createAsyncThunk(
  "appointment/year",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get("/api/appointments/years");
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue("An unexpected error happened.");
    }
  },
);

// Book an appointment for the logged patient
export const bookAppointment = createAsyncThunk(
  "appointment/book",
  async (appointmentData, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/api/appointments/add", appointmentData);
      return data;
    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      return rejectWithValue("An unexpected error happened.");
    }
  },
);
