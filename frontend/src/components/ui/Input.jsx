import { useId, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { cn } from "@/utils/cn";

function Input({
  RightIcon,
  LeftIcon,
  className,
  labelCN,
  type,
  placeholder,
  label,
  id,
  error,
  ...props
}) {
  //   Generate id using react useId hook
  const generateId = useId();
  //   Take id from the prop otherwise generated id
  const inputId = id || generateId;
  const [hidden, setIsHidden] = useState(true);
  //   If typ is password then check whether that is hidden or not
  const inpuyType = type === "password" ? (hidden ? "password" : "text") : type;

  //   Show password or hide password
  const handleShowPassword = () => {
    setIsHidden(!hidden);
  };

  return (
    <div className="w-full flex flex-col gap-1.5 sm:gap-2">
      {/* Label for better interaction if user click on it the input is get ready to type in */}
      <label htmlFor={inputId} className={cn("", labelCN)}>
        {label}
      </label>
      {/* Box for the input, leftIcon, and rightIcon with showPasswordFunctionality */}
      <div className="w-full flex items-center gap-1 px-1 sm:px-1.5 py-1 sm:py-1.5 border-2 border-[#121629] rounded-sm md:rounded-md">
        {LeftIcon && <LeftIcon />}
        <input
          type={inpuyType}
          id={inputId}
          placeholder={placeholder}
          className={cn("flex-1 w-full h-full outline-none", className)}
          {...props}
        />
        {type === "password" && (
          <button type="button" onClick={handleShowPassword}>
            {hidden ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        )}
        {RightIcon && <RightIcon />}
      </div>
      {/* If any error to show just below the input like validation */}
      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  );
}

export default Input;
