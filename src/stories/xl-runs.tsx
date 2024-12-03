import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { BlueHeader, BlueNumber, Label } from "./common";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  xlRuns: NonNullable<Stats["xlRuns"]>;
};

export const XLRunsStory = ({ xlRuns }: Props) => (
  <Story>
    <BlueHeader>XLKM RUN</BlueHeader>

    <p>
      <BlueNumber>{xlRuns.numRaces}</BlueNumber>
      <Label> участия в xlkm run</Label>
    </p>
    <p>
      <BlueNumber>{formatDistance(xlRuns.totalDistance)}</BlueNumber>{" "}
      <Label> пробягани км</Label>
    </p>
    <p>
      <BlueNumber>{formatTimeShort(xlRuns.totalTime)}</BlueNumber>
      <Label> общо време</Label>
    </p>
  </Story>
);
