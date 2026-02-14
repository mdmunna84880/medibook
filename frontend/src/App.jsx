/** @format */

import { useDispatch } from "react-redux";
import AppRoutes from "./routes";
import { useEffect, useRef } from "react";
import { getMe } from "./store/auth/authThunk";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  const isFirstRender = useRef(true);

  useEffect(() => {
    if(isFirstRender.current){
      isFirstRender.current= false;
      dispatch(getMe());
    }
  }, [dispatch]);

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes />
    </>
  );
}

export default App;
