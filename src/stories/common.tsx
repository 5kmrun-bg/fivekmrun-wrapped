/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";

const redGradient =
  "font-bold italic bg-gradient-to-r from-[#FF0D4D] to-[#FF5726] inline-block text-transparent bg-clip-text";

const blueGradient =
  "font-bold italic bg-gradient-to-r from-[#0973CD] to-[#308DDC] inline-block text-transparent bg-clip-text";

const yellowGradient =
  "font-bold italic bg-gradient-to-r from-[#FFD900] to-[#FFBB00] inline-block text-transparent bg-clip-text";

export const RedHeader = (props: any) => (
  <h1 className={cn(redGradient, "text-5xl self-center")} {...props} />
);

export const RedNumber = (props: any) => (
  <span className={cn(redGradient, "text-4xl")} {...props} />
);

export const BlueHeader = (props: any) => (
  <h1 className={cn(blueGradient, "text-5xl self-center")} {...props} />
);

export const BlueNumber = (props: any) => (
  <span className={cn(blueGradient, "text-4xl")} {...props} />
);

export const YellowHeader = (props: any) => (
  <h1 className={cn(yellowGradient, "text-5xl self-center")} {...props} />
);

export const YellowNumber = (props: any) => (
  <span className={cn(yellowGradient, "text-4xl")} {...props} />
);

export const Label = (props: any) => (
  <span className="text-lg uppercase font-bold color-[#E7EFFF]" {...props} />
);
