import { Link } from "react-router";
function Error({error}) {
    return ( <div className="text-[#232946] my-12 w-full flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl md:text-3xl mb-2">Error Occured, Try after sometime.</h1>
        <p className="text-red-400 text-base">{error}</p>
        <Link to="/" className="hover:scale-105 bg-[#b8c1ec] rounded-md px-2 py-2 hover:mt-1">Go to Dashboard</Link>
    </div> );
}

export default Error;