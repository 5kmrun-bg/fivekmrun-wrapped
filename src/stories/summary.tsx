import { Story } from "@/components/story";
import { BlueText, Label, RedHeader, RedText, YellowText } from "./common";
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
  totals: { runs, selfieRuns, xlRuns, kms, time, userProfileImg },
  isActive,
}: Props) => {
  return (
    <Story className="relative justify-start">
      <img
        src={backgroundSrc}
        className="absolute inset-x-0 top-64 w-full object-cover"
      />
      <RedHeader className="mt-4">5KM RUN</RedHeader>
      {userProfileImg && (
        <img
          className="w-1/3 aspect-square rounded-full object-cover self-center"
          src={userProfileImg}
        />
      )}
      <div className="self-center flex flex-row gap-4 mt-8">
        {runs > 0 && (
          <p>
            <RedText>{runs}</RedText>
            <Label>5kmrun участия</Label>
          </p>
        )}
        {xlRuns > 0 && (
          <p className="self-center">
            <BlueText>{xlRuns}</BlueText>
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
      <p className="self-center mt-8">
        <RedText>{formatDistance(kms)}</RedText> <Label> пробягани км</Label>
      </p>
      <p className="self-center mt-8">
        <RedText>{formatTimeShort(time)}</RedText>
        <Label> общо време</Label>
      </p>
      <p className="self-center mt-8">
        Организирани бягания в <YellowText>14</YellowText> града всяка седмица.
      </p>
    </Story>
  );
};
