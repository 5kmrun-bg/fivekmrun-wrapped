import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { RedHeader, RedNumber, Label } from "./common";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  officialRuns: NonNullable<Stats["officialRuns"]>;
};

export const OfficialRunsStory = ({
  officialRuns: { activeWeeks, totalDistance, totalTime },
}: Props) => (
  <Story>
    <RedHeader>5KM RUN</RedHeader>

    <p>
      <RedNumber>{activeWeeks}</RedNumber>
      <Label> участия в 5kmrun</Label>
    </p>
    <p>
      <RedNumber>{formatDistance(totalDistance)}</RedNumber>{" "}
      <Label> пробягани км</Label>
    </p>
    <p>
      <RedNumber>{formatTimeShort(totalTime)}</RedNumber>
      <Label> общо време</Label>
    </p>
  </Story>
);
