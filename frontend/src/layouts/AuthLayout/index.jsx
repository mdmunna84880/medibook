import { Outlet } from "react-router";

function AuthLayout() {
    return ( 
        <div className="min-h-screen w-full flex justify-center items-center bg-[#d4d8f0]">
            <Outlet />
        </div>
     );
}

export default AuthLayout;