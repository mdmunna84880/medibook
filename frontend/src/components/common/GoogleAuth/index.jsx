import { auth, provider } from "@/config/firebase";
import { googleAuth } from "@/store/auth/authThunk";
import { cn } from "@/utils/cn";
import { signInWithPopup} from "firebase/auth";

import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";

function GoogleAuth({authType}) {
    const dispatch = useDispatch();

    // Handle google authentication
    const handleGoogleAuth =async ()=>{
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            // Find the google Provider user data
            const googleProvider = user.providerData.find((p)=> p.providerId === "google.com");

            // Extract useful data from user
            const data = {
            email: user.email,
            name: user.displayName,
            avatar: user.photoURL,
            googleId: googleProvider?.uid
          }
          // Dispatch the data to register or login
          dispatch(googleAuth(data));
        }catch(err){
            console.log("Google login erro", err)
        }
    }

    return (
        <button
          onClick={handleGoogleAuth}
          className={cn(
            "bg-[#fffffe] w-full border border-[#121629] shadow-md flex justify-between items-center gap-4 rounded-md px-4",
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