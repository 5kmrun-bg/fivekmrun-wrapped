import { Story } from "@/components/story";
import { Label, RedHeader, RedText } from "./common";
import backgroundSrc from "./assets/2024-bg.svg";
import { loadStats } from "@/stats";
import { formatTimeShort } from "@/lib/utils";
import { formatDistance } from "@/lib/utils";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  totals: NonNullable<Stats["totals"]>;
  isActive?: boolean;
};

export const Summary = ({
  totals: { participations, kms, time },
  isActive,
}: Props) => {
  return (
    <Story className="relative justify-start">
      <img
        src={backgroundSrc}
        className="absolute inset-x-0 top-64 w-full object-cover"
      />
      <RedHeader>5KM RUN</RedHeader>
      <p className="self-center">
        <RedText>{participations}</RedText>
        <Label> участия в 5kmrun</Label>
      </p>
      <p className="self-center">
        <RedText>{formatDistance(kms)}</RedText> <Label> пробягани км</Label>
      </p>
      <p className="self-center">
        <RedText>{formatTimeShort(time)}</RedText>
        <Label> общо време</Label>
      </p>
    </Story>
  );
};
