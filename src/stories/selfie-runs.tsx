import { motion } from "motion/react";
import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { RedHeader, RedText, Label } from "./common";

import backgroundSrc from "./assets/selfie-bg.svg";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  selfieRuns: NonNullable<Stats["selfieRuns"]>;
  isActive?: boolean;
};

const AnimatedCheck = ({ isActive }: { isActive?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="80px"
    width="80px"
    viewBox="0 -3 24 24"
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
  >
    <motion.path
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={{
        hidden: {
          opacity: 0,
          pathLength: 0,
          transition: { duration: 0, delay: 0.5 },
        },
        visible: {
          opacity: 1,
          pathLength: 1,
          transition: { duration: 0.4, delay: 0.5, type: "tween" },
        },
      }}
      stroke="url(#check-gradient)"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="transparent"
      d="M4 12 L10 18 L20 6"
    />
    <defs>
      <linearGradient
        id="check-gradient"
        x1="0"
        x2="30"
        gradientUnits="userSpaceOnUse"
      >
        <stop stop-color="#FF0D4D" />
        <stop offset="1" stop-color="#FF5726" />
      </linearGradient>
    </defs>
  </svg>
);

export const SelfieRunsStory = ({
  selfieRuns: { activeWeeks, totalDistance, totalTime },
  isActive,
}: Props) => (
  <Story>
    <RedHeader>5KM Selfie</RedHeader>

    <div className="max-w-none w-[calc(100%+2rem)] max-h-[180px] -mx-4 relative">
      <img src={backgroundSrc} className="size-full" />
      <AnimatedCheck isActive={isActive} />
    </div>

    <p className="self-center">
      <RedText>{activeWeeks}</RedText>
      <Label> седмици в класацията</Label>
    </p>
    <p className="self-center">
      <RedText>{formatDistance(totalDistance)}</RedText>{" "}
      <Label> пробягани км</Label>
    </p>
    <p className="self-center">
      <RedText>{formatTimeShort(totalTime)}</RedText>
      <Label> общо време</Label>
    </p>
  </Story>
);
