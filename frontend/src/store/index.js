import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import serviceReducer from "./service/serviceSlice";
import appointmentReducer from "./appointment/appointmentSlice";
import doctorReducer from "./doctor/doctorSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    service: serviceReducer,
    doctor: doctorReducer,
    appointment: appointmentReducer
  }
});
