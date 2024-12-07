import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { formatDistance, formatTimeShort } from "@/lib/utils";
import { BlueHeader, BlueText, Label } from "./common";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  xlRuns: NonNullable<Stats["xlRuns"]>;
};

export const XLRunsStory = ({ xlRuns }: Props) => (
  <Story>
    <BlueHeader>XLKM RUN</BlueHeader>

    <p>
      <BlueText>{xlRuns.numRaces}</BlueText>
      <Label> участия в xlkm run</Label>
    </p>
    <p>
      <BlueText>{formatDistance(xlRuns.totalDistance)}</BlueText>{" "}
      <Label> пробягани км</Label>
    </p>
    <p>
      <BlueText>{formatTimeShort(xlRuns.totalTime)}</BlueText>
      <Label> общо време</Label>
    </p>
  </Story>
);
