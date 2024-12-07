import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { RedHeader, RedText, Label } from "./common";

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
      <RedText>{activeWeeks}</RedText>
      <Label> седмици в класацията</Label>
    </p>
    <p>
      <RedText>{formatDistance(totalDistance)}</RedText>{" "}
      <Label> пробягани км</Label>
    </p>
    <p>
      <RedText>{formatTimeShort(totalTime)}</RedText>
      <Label> общо време</Label>
    </p>
  </Story>
);
