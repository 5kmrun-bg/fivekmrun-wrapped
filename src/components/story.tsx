import { cn } from "@/lib/utils";
import React from "react";
import { motion } from "motion/react";

const transition = { duration: 0.5, delay: 0.3 };
const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export const Story = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full h-full flex flex-col justify-center items-stretch gap-4 p-4 rounded pt-8 text-xl font-bold",
      className
    )}
    {...props}
  >
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={transition}
      variants={variants}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  </div>
));
Story.displayName = "Story";
