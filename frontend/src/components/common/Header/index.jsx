/** @format */

import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router";
import { Tooltip } from "react-tooltip";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/assets/brand/logo";
import Container from "@/components/ui/Container";
import { NAV_ITEMS } from "@/components/common/naveItem";

function Header({isOpen, handleSideBar}) {
  return (
    <section className="w-full bg-[#232946] h-16">
      <Container className={"flex justify-between z-20 shadow-2xl"}>
        <motion.div layout className="flex items-center gap-6">
          <AnimatePresence>
            {isOpen && (
              // Motion animation for smooth removing and adding the Patient System text in the header
              <motion.p
                initial={{ x: "-50%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-50%", opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="text-[#fffffe] max-w-60"
              >
                Patient System
              </motion.p>
            )}
          </AnimatePresence>

          {/* Hamburger button to open and close the sidebar */}
          <button
            className="text-[#fffffe] cursor-pointer"
            onClick={handleSideBar}
          >
            <RxHamburgerMenu className="text-xl" />
          </button>

          <Link to="/"><Logo /></Link>
        </motion.div>
        {/* Nav items that will only appear on Tablet, Laptop and PC */}
        <ul className="hidden sm:flex gap-4 sm:gap-6 md:gap-8 items-center">
          {NAV_ITEMS.map(({ title, icon, href, textOnHover }) => {
            const Icon = icon;
            return (
              <li key={href}>
                <Link
                  to={href}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={textOnHover}
                  className="text-[#fffffe] hover:text-[#eebbc3] flex gap-0.5 sm:gap-1 md:gap-2 items-center whitespace-nowrap"
                >
                  <span>
                    <Icon className="text-xl" />
                  </span>
                  <span className="hidden lg:block">{title}</span>
                </Link>
                <Tooltip
                  id="my-tooltip"
                  style={{ backgroundColor: "#121629", color: "#fffffe" }}
                />
              </li>
            );
          })}
        </ul>
      </Container>
      
    </section>
  );
}

export default Header;
