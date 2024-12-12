/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { DOMAttributes } from "react";

type Props = {
  className?: string;
} & DOMAttributes<HTMLElement>;

const redGradient =
  "font-bold italic bg-gradient-to-r from-[#FF0D4D] to-[#FF5726] inline-block text-transparent bg-clip-text";

const blueGradient =
  "font-bold italic bg-gradient-to-r from-[#0973CD] to-[#308DDC] inline-block text-transparent bg-clip-text";

const yellowGradient =
  "font-bold italic bg-gradient-to-r from-[#FFD900] to-[#FFBB00] inline-block text-transparent bg-clip-text";

export const RedHeader = ({ className, ...rest }: Props) => (
  <h1
    className={cn(redGradient, "text-5xl self-center", className)}
    {...rest}
  />
);

export const RedText = ({ className, ...rest }: Props) => (
  <span className={cn(redGradient, "text-4xl mr-2", className)} {...rest} />
);

export const BlueHeader = ({ className, ...rest }: Props) => (
  <h1
    className={cn(blueGradient, "text-5xl self-center", className)}
    {...rest}
  />
);

export const BlueText = ({ className, ...rest }: Props) => (
  <span className={cn(blueGradient, "text-4xl mr-2", className)} {...rest} />
);

export const YellowHeader = ({ className, ...rest }: Props) => (
  <h1
    className={cn(yellowGradient, "text-5xl self-center", className)}
    {...rest}
  />
);

export const YellowText = ({ className, ...rest }: Props) => (
  <span className={cn(yellowGradient, "text-4xl mr-2", className)} {...rest} />
);

export const Label = ({ className, ...rest }: Props) => (
  <span
    className={cn("text-lg uppercase font-bold color-[#E7EFFF]", className)}
    {...rest}
  />
);
