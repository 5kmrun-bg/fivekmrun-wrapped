import React from "react";
import { cn } from "@/lib/utils";
import { Logo } from "@/stories/logo";

export const Story = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { showLogo?: boolean }
>(({ className, children, showLogo = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full h-full flex flex-col justify-center items-stretch gap-4 p-4 rounded pt-8 text-xl font-bold bg-[#1D1E22] relative",
      className
    )}
    {...props}
  >
    {showLogo && <Logo />}

    {children}
  </div>
));
Story.displayName = "Story";
