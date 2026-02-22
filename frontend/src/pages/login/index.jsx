/** @format */

import Input from "@/components/ui/Input";
import { CiMail } from "react-icons/ci";
import { Link, useLocation } from "react-router";
import { TbLockPassword } from "react-icons/tb";
import { cn } from "@/utils/cn";
import GoogleAuth from "@/components/common/GoogleAuth";
import { useEffect, useRef, useState } from "react";
import { validateEmail, validatePassword } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/auth/authThunk";
import { toast } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const location = useLocation();
  // Get loading error from the auth reducer
  const { error, loading } = useSelector(
    (state) => state.auth,
  );

  // State
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });

  // Ref to track the toast
  const hasShownRedirect = useRef(false);

  // Validate the email, password and get  validation error
  const emailValidation = validateEmail(formData.email);
  const passwordValidation = validatePassword(formData.password);

  // Disable the login or not
  const isLoginBtnDisabled =
    !emailValidation.isValid || !passwordValidation.isValid || loading;

  // Handle form input of email, and password
  const handleFormData = (e) => {
    const { name, value } = e.target;
    // Set the new input value
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle when the user leave the input field show validation error imadiately
  const handleInputBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  // Handle Submit the data
  const handleDataSubmission = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: formData.email.trim(),
        password: formData.password.trim(),
      }),
    );
  };

  // Show error if there is error occured
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Show login to continue, if they are come pushed to this route
  useEffect(() => {
    if (location.state?.fromProtected && !hasShownRedirect.current && !error) {
      toast.warning("Please login to continue");
      hasShownRedirect.current = true;
    }
  }, [location.state?.fromProtected, error]);

  return (
    <div className="bg-[#fffffe] border border-[#121629]/60 rounded-sm sm:rounded-md shadow-md sm:shadow-xl">
      {/* Warm up welcom words and a bit information */}
      <div className="bg-[#d4d8f0]/60 flex flex-col gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-t-sm sm:rounded-t-md">
        <h3 className="text-[#232946] text-xl sm:text-2xl text-center">
          Welcome Back
        </h3>
        <p className="text-[#232946] text-base sm:text-lg">
          Sign in to Book an book appointment
        </p>
      </div>
      {/* Local authentication form */}
      <form
        className="px-2 sm:px-4 py-1 sm:py-2 flex flex-col gap-4"
        onSubmit={handleDataSubmission}
      >
        <Input
          label={"Enter your email address"}
          placeholder={"mdmunna234@gmail.com"}
          LeftIcon={CiMail}
          autoComplete="username"
          name="email"
          value={formData.email}
          onChange={handleFormData}
          onBlur={handleInputBlur}
          error={
            touched.email && !emailValidation.isValid
              ? emailValidation.errors[0]
              : ""
          }
        />
        <Input
          label={"Enter your password"}
          placeholder={"ABc#$239"}
          LeftIcon={TbLockPassword}
          type={"password"}
          autoComplete="current-password"
          name="password"
          value={formData.password}
          onChange={handleFormData}
          onBlur={handleInputBlur}
          error={
            touched.password && !passwordValidation.isValid
              ? passwordValidation.errors[0]
              : ""
          }
        />
        <button
          type="submit"
          disabled={isLoginBtnDisabled}
          className={cn(
            "w-full border border-[#121629] bg-[#b8c1ec] rounded-sm md:rounded-md py-1 text-lg",
            "flex items-center justify-center gap-2",
            "cursor-pointer text-[#232946] disabled:bg-gray-400 disabled:cursor-not-allowed",
          )}
        >
          {loading ? (
            <>
              {/* Small apinner in the button */}
              <span className="w-4 h-4 border-2 border-[#232946] border-t-transparent rounded-full animate-spin"></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>
      </form>
      {/* Horizontal line to differentiate between google and local authentication */}
      <div className="flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 w-full">
        <div className="h-px w-1/2 bg-[#121629]/60" />
        <p className="text-[#232946]">Or</p>
        <div className="h-px w-1/2 bg-[#121629]/60" />
      </div>
      {/* Sign with google */}
      <div className="px-2 sm:px-4 py-1 sm:py-2 flex justify-center w-full">
        <GoogleAuth authType={"Sign In"} />
      </div>
      {/* No account link to sign up */}
      <div className="flex justify-center mb-4">
        <p className="text-[#232946] text-base">
          Don't you have account?{" "}
          <Link to="/auth/signup" className="font-semibold underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
