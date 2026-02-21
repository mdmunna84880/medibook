/** @format */

import { Link } from "react-router";
import { NAV_ITEMS } from "../naveItem";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { getMe, logout } from "@/store/auth/authThunk";
import { FaHospitalUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { toast } from "react-toastify";
import { updateAvatar } from "@/store/user/userThunk";
import { useRef } from "react";

function SideBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const fileInputRef = useRef(null);

  // Make the profile to uploadable file.
  const handleAvatarClick = ()=>{
    fileInputRef.current.click();
  }

  // Change the avatar when user select the images.
  const handleAvatarChange = async (e)=>{
    const file = e.target.files[0];
    // Show toast if user don't exist.
    if(!file){
      toast.error("You haven't selected the file.");
      return;
    }
    // Show the error if user uploading different type of file
    if(!file.type.startsWith("image/")){
      toast.error("Only images are allowed");
      return;
    }
    // Change that file into formdata means multipart/form (real object not json like object)
    const formData = new FormData();
    formData.append("avatar", file);

    try{
      // Update the avatar
      await dispatch(updateAvatar(formData)).unwrap();
      toast.success("Your profile photo changed successfully.")
      dispatch(getMe());
    }catch(err){
      toast.error(err?.msg || "Failed to change the profile photo.")
    }
  }

  return (
    <motion.div
      initial={{ x: "-50%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-50%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative min-w-48 max-w-60 min-h-screen pt-4 sm:pt-6 md:pt-8 px-2 sm:px-4 md:px-6 lg:px-8 bg-[#232946] shadow-sm text-[#fffffe]"
    >
      <div className="flex flex-col justify-center items-center gap-4 mb-4">
        <div className="flex justify-center items-center">
          <button onClick={handleAvatarClick} className="cursor-pointer">
            {user.avatar ? (
              <img
              src={user.avatar}
              alt="User name"
              className="w-12 h-12 rounded-full border-2 border-[#fffffe]"
            />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-[#fffffe] flex items-center justify-center bg-[#b8c1ec] text-[#232946] text-2xl font-bold">
              {user.name[0]}
            </div>
          )}
          </button>
        </div>
        <input
            type="file"
            ref={fileInputRef}
            onChange={handleAvatarChange}
            accept="image/*"
            className="hidden"
        />
        <p className="font-bold">{user.name}</p>
      </div>
      {/* Nav items that will only appear on the Mobile, not for tablet, laptop and pc */}
      <ul className="flex sm:hidden flex-col gap-4 justify-center">
        {NAV_ITEMS.map(({ title, icon, href, textOnHover }) => {
          const Icon = icon;
          return (
            <li>
              <Link
                to={href}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={textOnHover}
                className="text-[#fffffe] hover:text-[#eebbc3] flex gap-2 items-center whitespace-nowrap"
              >
                <Icon /> {title}
              </Link>
              <Tooltip
                id="my-tooltip"
                style={{ backgroundColor: "#121629", color: "#fffffe" }}
              />
            </li>
          );
        })}
      </ul>

      <ul className="flex flex-col gap-4 items-stretch mt-4">
        <li>
          <Link
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"See your details"}
            to="/"
            className="hover:text-[#eebbc3] flex gap-2 items-center"
          >
            <FaHospitalUser />
            <span>Patient</span>
          </Link>
          <Tooltip
            id="my-tooltip"
            style={{ backgroundColor: "#121629", color: "#fffffe" }}
          />
        </li>
        <li>
          <button
            data-tooltip-id="my-tooltip"
            data-tooltip-content={"Log out from MediBook"}
            className="cursor-pointer text-base hover:text-red-400 flex gap-2 items-center"
            onClick={() => dispatch(logout())}
          >
            <span>
              <FiLogOut />
            </span>
            <span>Log out</span>
          </button>
          <Tooltip
            id="my-tooltip"
            style={{ backgroundColor: "#121629", color: "#fffffe" }}
          />
        </li>
      </ul>
    </motion.div>
  );
}

export default SideBar;
