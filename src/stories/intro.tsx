import { motion } from "motion/react";
import { Story } from "@/components/story";
import { loadStats } from "@/stats";
import { RedText } from "./common";
import { cn } from "@/lib/utils";
import { YearBackground } from "./year-background";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  user: NonNullable<Stats["user"]>;
  isActive?: boolean;
};

const squareAndRound = "w-full aspect-square rounded-full";

export const IntroStory = ({ user, isActive }: Props) => (
  <Story className="relative justify-start">
    <YearBackground position="bottom" />

    <motion.div
      className={cn(squareAndRound, "bg-slate-800 p-6 mt-10")}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={{
        hidden: { scale: 0, transition: { duration: 0, delay: 0.5 } },
        visible: { scale: 1 },
      }}
      transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.5 }}
    >
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
          <span className="text-5xl italic font-light block">Здравей,</span>
          <RedText className="text-4xl mx-4">{user.name}</RedText>
        </div>
      </div>
    </motion.div>
  </Story>
);
