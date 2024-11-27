import { cn } from "@/lib/utils";
import React from "react";

export const Story = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full h-full flex flex-col justify-center items-stretch gap-4 p-4 rounded pt-8 text-xl font-bold",
      className
    )}
    {...props}
  />
));
Story.displayName = "Story";
