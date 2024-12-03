import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { RedHeader, RedNumber, Label } from "./common";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  selfieRuns: NonNullable<Stats["selfieRuns"]>;
};

export const SelfieRunsStory = ({
  selfieRuns: { activeWeeks, totalDistance, totalTime },
}: Props) => (
  <Story>
    <RedHeader>5KM Selfie</RedHeader>

    <p>
      <RedNumber>{activeWeeks}</RedNumber>
      <Label> седмици в класацията</Label>
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
