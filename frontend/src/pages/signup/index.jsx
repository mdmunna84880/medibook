/** @format */

import Input from "@/components/ui/Input";
import { CiMail } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router";
import { TbLockPassword } from "react-icons/tb";
import { cn } from "@/utils/cn";
import GoogleAuth from "@/components/common/GoogleAuth";
import { useEffect, useRef, useState } from "react";
import { validateEmail, validateName, validatePassword } from "@/utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "@/store/auth/authThunk";
import { toast } from "react-toastify";
import { MdBadge } from "react-icons/md";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, message, isAuthenticated, loading } = useSelector(
    (state) => state.auth,
  );

  // State
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [touched, setTouched] = useState({name: false, email: false, password: false });

  // Ref to track the toast
  const hasShownLogin = useRef(false);
  const hasShownRedirect = useRef(false);

  // Validate the email, password, name and get  validation error
  const emailValidation = validateEmail(formData.email);
  const passwordValidation = validatePassword(formData.password);
  const nameValidation = validateName(formData.name);

  // Disable the login or not
  const isSignUpDisabled =
    !emailValidation.isValid || !passwordValidation.isValid || !nameValidation.isValid || loading;

  // Handle form input of name, email, and password
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
    // Dispatch the signup to get signed in
    dispatch(
      signup({
        name: formData.name.trim(),
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

  // Show sign up to continue, if they are pushed to this route
  useEffect(() => {
    if (location.state?.fromProtected && !hasShownRedirect.current) {
      toast.warning("Please sign up to continue");
      hasShownRedirect.current = true;
    }
  }, [location.state?.fromProtected]);

  // Show signup success message after successful sign up and navigate to the user from where they are redirected
  useEffect(() => {
    if (isAuthenticated && message && !hasShownLogin.current) {
      toast.success(message);
      hasShownLogin.current = true;
      // Get the previous location from where the user redirected for register
      const redirectPath = location.state?.from || "/";
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, message, navigate, location.state?.from]);

  return (
    <div className="bg-[#fffffe] border border-[#121629]/60 rounded-sm sm:rounded-md shadow-md sm:shadow-xl">
      {/* Warm up welcom words and a bit information */}
      <div className="bg-[#d4d8f0]/60 flex flex-col gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-t-sm sm:rounded-t-md">
        <h3 className="text-[#232946] text-xl sm:text-2xl text-center">
          Welcome Back
        </h3>
        <p className="text-[#232946] text-base sm:text-lg">
          Sign up to Book an book appointment
        </p>
      </div>
      {/* Local authentication form */}
      <form
        className="px-2 sm:px-4 py-1 sm:py-2 flex flex-col gap-4"
        onSubmit={handleDataSubmission}
      >
        <Input
          label={"Enter your name:"}
          placeholder={"Md Munna"}
          LeftIcon={MdBadge}
          autoComplete="name"
          name="name"
          value={formData.name}
          onChange={handleFormData}
          onBlur={handleInputBlur}
          error={
            touched.name && !nameValidation.isValid
              ? nameValidation.errors[0]
              : ""
          }
        />
        <Input
          label={"Enter your email address"}
          placeholder={"mdmunna234@gmail.com"}
          LeftIcon={CiMail}
          autoComplete="email"
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
          autoComplete="new-password"
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
          disabled={isSignUpDisabled}
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
              Signing up...
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
      {/* Sign up with google */}
      <div className="px-2 sm:px-4 py-1 sm:py-2 flex justify-center w-full">
        <GoogleAuth authType={"Sign Up"} />
      </div>
      {/* No account link to sign up */}
      <div className="flex justify-center mb-4">
        <p className="text-[#232946] text-base">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
