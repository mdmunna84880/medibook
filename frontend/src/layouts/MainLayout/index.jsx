import Header from "@/components/common/Header";
import { Outlet } from "react-router";
import Footer from "@/components/common/Footer";

function MainLayout() {
    return ( 
        <div className="min-h-screen w-full flex flex-col">
            <Header />
            <div className="flex-1 my-12 md:my-16 lg:my-20">
                <Outlet />
            </div>
            <Footer />
        </div>
     );
}

export default MainLayout;