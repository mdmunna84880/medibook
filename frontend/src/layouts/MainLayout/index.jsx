/** @format */

import Header from "@/components/common/Header";
import { Outlet } from "react-router";
import Footer from "@/components/common/Footer";
import SideBar from "@/components/common/SideBar";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(false);

  //   Handle sidebar cloase and open
  const handleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <header>
        <Header handleSideBar={handleSideBar} isOpen={isOpen} />
      </header>
      <div className="flex-1 bg-[#d4d8f0] text-[#232946]">
        <main className="relative flex">
          {/* Side Bar */}
          <AnimatePresence>
            {isOpen && <SideBar />}
          </AnimatePresence>
          {/* Other page like services, appointments and more */}
          <div className="flex-1">
            <Outlet />
          </div>
        </main>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
