/** @format */

import { Link } from "react-router";
import { NAV_ITEMS } from "../naveItem";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { logout } from "@/store/auth/authThunk";
import { FaHospitalUser } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

function SideBar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="User name"
              className="w-12 h-12 rounded-full border-2 border-[#fffffe]"
            />
          ) : (
            <button className="w-12 h-12 rounded-full border-2 border-[#fffffe] flex items-center justify-center bg-[#b8c1ec] text-[#232946] text-2xl font-bold">
              {user.name[0]}
            </button>
          )}
        </div>
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
            to="/profile"
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
