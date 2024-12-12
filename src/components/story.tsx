import { cn } from "@/lib/utils";
import React from "react";

export const Story = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full h-full flex flex-col justify-center items-stretch gap-7 p-4 rounded pt-8 text-xl font-bold bg-[#1D1E22]",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
Story.displayName = "Story";
