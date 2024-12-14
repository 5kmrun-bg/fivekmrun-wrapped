import { Story } from "@/components/story";
import { Label, RedHeader, RedText } from "./common";
import backgroundSrc from "./assets/2024-bg.svg";
import { loadStats } from "@/stats";
import { formatTimeShort } from "@/lib/utils";
import { formatDistance } from "@/lib/utils";
import logo from "@/assets/logo.svg";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  totals: NonNullable<Stats["totals"]>;
  isActive?: boolean;
};

export const Summary = ({
  totals: { runs, selfieRuns, xlRuns, kms, time, userName },
}: Props) => {
  return (
    <Story className="relative justify-start" showLogo={false}>
      <img
        src={backgroundSrc}
        className="absolute inset-x-0 top-64 w-full object-cover"
      />
      <RedHeader className="mt-4">5KM RUN</RedHeader>
      <img
        src={logo}
        className="w-1/3 aspect-square rounded-full object-cover self-center"
      />

      <p className="self-center">{userName}</p>

      <div className="self-center flex flex-row gap-4 mt-4">
        {runs > 0 && (
          <p>
            <RedText>{runs}</RedText>
            <Label>5km&nbsp;run участия</Label>
          </p>
        )}
        {xlRuns > 0 && (
          <p className="self-center">
            <RedText>{xlRuns}</RedText>
            <Label>XLRun участия</Label>
          </p>
        )}
        {selfieRuns > 0 && (
          <p className="self-center">
            <RedText>{selfieRuns}</RedText>
            <Label>Selfie участия</Label>
          </p>
        )}
      </div>
      <p className="self-center mt-4">
        <RedText>{formatDistance(kms)}</RedText> <Label> пробягани км</Label>
      </p>
      <p className="self-center mt-4">
        <RedText>{formatTimeShort(time)}</RedText>
        <Label> общо време</Label>
      </p>
      <p className="self-center mt-4 text-lg font-bold color-[#E7EFFF] all-small-caps">
        Организирани бягания в <RedText>14</RedText> града всяка седмица.
      </p>
    </Story>
  );
};
