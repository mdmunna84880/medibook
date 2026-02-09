/** @format */

import Input from "@/components/ui/Input";
import { CiMail } from "react-icons/ci";
import { Link } from "react-router";
import { TbLockPassword } from "react-icons/tb";
import { FcGoogle } from "react-icons/fc";
import { cn } from "@/utils/cn";

function Login() {
  return (
    <div className="bg-[#fffffe] border border-[#121629]/60 rounded-sm sm:rounded-md shadow-md sm:shadow-xl">
      {/* Warm up welcom words and a bit information */}
      <div className="bg-[#d4d8f0]/60 flex flex-col gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-t-sm sm:rounded-t-md">
        <h3 className="text-[#232946] text-xl sm:text-2xl text-center">
          Welcom Back
        </h3>
        <p className="text-[#232946] text-base sm:text-lg">
          Sign In to Book an book appointment
        </p>
      </div>
      {/* Local authentication form */}
      <form className="px-2 sm:px-4 py-1 sm:py-2 flex flex-col gap-4">
        <Input
          label={"Enter your email address"}
          placeholder={"mdmunna234@gmail.com"}
          LeftIcon={CiMail}
          autoComplete="username"
        />
        <Input
          label={"Enter your password"}
          placeholder={"mdmunna#99"}
          LeftIcon={TbLockPassword}
          type={"password"}
          autoComplete="current-password"
        />
        <button className={cn("w-full border border-[#121629] bg-[#b8c1ec] rounded-sm md:rounded-md py-1 text-lg", "cursor-pointer text-[#232946]")}>
          Login
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
        <button
          className={cn(
            "bg-[#fffffe] w-full drop-shadow-lg flex justify-between items-center gap-4 rounded-full px-4",
            "py-1 sm:py-2 cursor-pointer hover:bg-[#fafaf5]",
          )}
        >
          <span>
            <FcGoogle className="text-lg sm:text-2xl" />
          </span>
          <span className="text-xl text-[#232946]">Sign in with Google</span>
        </button>
      </div>
      {/* No account link to sign up */}
      <div className="flex justify-center mb-4">
        <p className="text-[#232946] text-base">
          Don't you have account?{" "}
          <Link to="/signup" className="font-semibold underline">
            Create One
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
