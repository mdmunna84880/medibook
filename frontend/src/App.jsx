/** @format */

import { useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { useEffect } from "react";
import { getMe } from "./store/auth/authThunk";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </>
  );
}

export default App;
