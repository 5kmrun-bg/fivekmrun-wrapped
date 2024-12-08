import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { RedHeader, RedText, Label } from "./common";
import backgroundSrc from "./official-runs-bg.svg";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  officialRuns: NonNullable<Stats["officialRuns"]>;
};

export const OfficialRunsStory = ({
  officialRuns: { activeWeeks, totalDistance, totalTime },
}: Props) => (
  <Story>
    <RedHeader>5KM RUN</RedHeader>

    <img src={backgroundSrc} className="max-w-none w-[calc(100%+2rem)] -mx-4" />

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
