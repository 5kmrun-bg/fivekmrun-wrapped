import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { RedText } from "./common";
import { cn } from "@/lib/utils";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  user: NonNullable<Stats["user"]>;
};

const squareAndRound = "w-full aspect-square rounded-full";

export const IntroStory = ({ user }: Props) => (
  <Story>
    <div className={cn(squareAndRound, "bg-slate-800 p-6")}>
      <div
        className={cn(
          squareAndRound,
          "bg-gradient-to-r from-[#FF0D4D] to-[#FF5726] p-0.5"
        )}
      >
        <div
          className={cn(
            squareAndRound,
            "text-center content-center bg-slate-800"
          )}
        >
          <span className="text-5xl italic font-light">Здравей,</span>
          <RedText>{user.name}</RedText>
        </div>
      </div>
    </div>
  </Story>
);
