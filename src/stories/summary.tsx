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
  totals: { runs, selfieRuns, xlRuns, kms, time },
  isActive,
}: Props) => {
  return (
    <Story className="relative justify-start">
      <img
        src={backgroundSrc}
        className="absolute inset-x-0 top-64 w-full object-cover"
      />
      <RedHeader>5KM RUN</RedHeader>
      <div className="self-center flex flex-row gap-4">
        {runs > 0 && (
          <p>
            <RedText>{runs}</RedText>
            <Label>5kmrun участия</Label>
          </p>
        )}
        {selfieRuns > 0 && (
          <p className="self-center">
            <RedText>{selfieRuns}</RedText>
            <Label>Selfie участия</Label>
          </p>
        )}
        {xlRuns > 0 && (
          <p className="self-center">
            <RedText>{xlRuns}</RedText>
            <Label>XLRun участия</Label>
          </p>
        )}
      </div>
      <p className="self-center">
        <RedText>{formatDistance(kms)}</RedText> <Label> пробягани км</Label>
      </p>
      <p className="self-center">
        <RedText>{formatTimeShort(time)}</RedText>
        <Label> общо време</Label>
      </p>
      <p className="self-center">5kmrun много повече от бягане!</p>
    </Story>
  );
};
