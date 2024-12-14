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

const SummaryLabel = ({ children }: { children: React.ReactNode }) => (
  <Label className="text-md">{children}</Label>
);

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

      <div className="self-center flex flex-row gap-4 text-center">
        {runs > 0 && (
          <p>
            <RedText>{runs}</RedText>
            <br />
            <SummaryLabel>5km&nbsp;run участия</SummaryLabel>
          </p>
        )}
        {xlRuns > 0 && (
          <p className="self-center">
            <RedText>{xlRuns}</RedText>
            <br />
            <SummaryLabel>XLRun участия</SummaryLabel>
          </p>
        )}
        {selfieRuns > 0 && (
          <p className="self-center">
            <RedText>{selfieRuns}</RedText>
            <br />
            <SummaryLabel>Selfie участия</SummaryLabel>
          </p>
        )}
      </div>
      <p className="self-center mt-4">
        <RedText>{formatDistance(kms)}</RedText>{" "}
        <SummaryLabel> пробягани км</SummaryLabel>
      </p>
      <p className="self-center">
        <RedText>{formatTimeShort(time)}</RedText>
        <SummaryLabel> общо време</SummaryLabel>
      </p>
      <p className="self-center mt-4 text-md font-bold all-small-caps text-balance text-center">
        Организирани бягания в <RedText className="text-lg">14</RedText> града
        всяка седмица.
      </p>
    </Story>
  );
};
