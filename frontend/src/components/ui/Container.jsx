/** @format */

import { cn } from "@/utils/cn";

function Container({ children, className }) {
  return (
    <div
      className={cn(
        "container w-full px-2 sm:px-4 md:px-6 lg:px-8 mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
