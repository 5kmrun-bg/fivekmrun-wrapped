import { motion } from "motion/react";
import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { BlueHeader, BlueText, Label } from "./common";

import backgroundSrc from "./assets/xlrun-bg.svg";
import runnerSrc from "./assets/xlrun-runner.svg";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  xlRuns: NonNullable<Stats["xlRuns"]>;
  isActive?: boolean;
};

export const XLRunsStory = ({ xlRuns, isActive }: Props) => (
  <Story>
    <BlueHeader>XLKM RUN</BlueHeader>

    <div className="max-w-none w-[calc(100%+2rem)] -mx-4 relative">
      <img src={backgroundSrc} className="w-full  max-h-[160px]" />
      <motion.img
        src={runnerSrc}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: {
            left: "-20%",
            opacity: 0,
            transition: { duration: 0, delay: 0.5 },
          },
          visible: { left: "50%", opacity: 1 },
        }}
        transition={{ duration: 0.4, delay: 0.5, type: "tween" }}
      />
    </div>

    <p className="self-center">
      <BlueText>{xlRuns.numRaces}</BlueText>
      <Label> участия в xlkm run</Label>
    </p>
    <p className="self-center">
      <BlueText>{formatDistance(xlRuns.totalDistance)}</BlueText>{" "}
      <Label> пробягани км</Label>
    </p>
    <p className="self-center">
      <BlueText>{formatTimeShort(xlRuns.totalTime)}</BlueText>
      <Label> общо време</Label>
    </p>
  </Story>
);
