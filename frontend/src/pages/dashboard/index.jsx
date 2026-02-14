import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import { toast } from "react-toastify";

function Dashboard() {
    const location = useLocation();
    const hasShownRedirect = useRef(false);

    // Show toast when the user tried to access the auth route after logged in.
     useEffect(()=>{
        if(location.state?.fromPublic && !hasShownRedirect.current){
          toast.info("You are already logged in or signed up.");
          hasShownRedirect.current = true;
        }
      }, [location.state?.fromPublic,location.state?.from ]);

    return ( 
        <div>Dashboard</div>
     );
}

export default Dashboard;