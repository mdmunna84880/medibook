
function Loading() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center justify-center">
        {/* Loading spinner */}
        <span className="w-16 h-16 border-4 border-[#232946] border-t-transparent rounded-full animate-spin" />
        {/* Text just below the spinner */}
        <span className="text-base md:text-xl text-[#232946] mt-4">Loading ...</span>
      </div>
    </div>
  );
}

export default Loading;
