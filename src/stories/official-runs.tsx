import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { RedHeader, RedText, Label } from "./common";
import backgroundSrc from "./official-runs-bg.svg";
import runnerSrc from "./runner.svg";
import { motion } from "motion/react";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  officialRuns: NonNullable<Stats["officialRuns"]>;
  isActive?: boolean;
};

export const OfficialRunsStory = ({
  officialRuns: { activeWeeks, totalDistance, totalTime },
  isActive,
}: Props) => {
  console.log("OfficialRunsStory", isActive);

  return (
    <Story>
      <RedHeader>5KM RUN</RedHeader>

      <div className="max-w-none w-[calc(100%+2rem)] -mx-4 relative">
        <img src={backgroundSrc} className="w-full" />
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
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        />
      </div>

      <p className="self-center">
        <RedText>{activeWeeks}</RedText>
        <Label> участия в 5kmrun</Label>
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
};
