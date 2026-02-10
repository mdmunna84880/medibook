import { auth, provider } from "@/config/firebase";
import { api } from "@/config/api";
import { cn } from "@/utils/cn";
import { signInWithPopup } from "firebase/auth";

import { FcGoogle } from "react-icons/fc";

function GoogleAuth({authType}) {

    const handleGoogleAuth =async ()=>{
        try{
            const result = await signInWithPopup(auth, provider);
            const services = await api.get("/");
            console.log("Services", services);
            console.dir(result.user);
        }catch(err){
            console.log("Google login erro", err)
        }
    }

    return (
        <button
          onClick={handleGoogleAuth}
          className={cn(
            "bg-[#fffffe] w-full drop-shadow-lg flex justify-between items-center gap-4 rounded-full px-4",
            "py-1 sm:py-2 cursor-pointer hover:bg-[#fafaf5]",
          )}
        >
          <span>
            <FcGoogle className="text-lg sm:text-2xl" />
          </span>
          <span className="text-xl text-[#232946]">{authType} with Google</span>
        </button>
    );
}

export default GoogleAuth;