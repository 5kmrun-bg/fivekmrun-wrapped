import { motion } from "motion/react";
import { Story } from "@/components/story";
import { YellowHeader, YellowText, Label } from "./common";

import backgroundSrc from "./assets/totals-bg.svg";
import runnerSrc from "./assets/totals-star.svg";

type Props = {
  isActive?: boolean;
};

export const OutroTotals = ({ isActive }: Props) => (
  <Story>
    <Label>През тази година ти допринесе към всичко това:</Label>

    <div className="max-w-none w-[calc(100%+2rem)] -mx-4 relative">
      <img src={backgroundSrc} className="w-full h-[168px]" />
      <motion.img
        src={runnerSrc}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial="hidden"
        animate={isActive ? "visible" : "hidden"}
        variants={{
          hidden: {
            rotate: 180,
            scale: 0,
            translate: "-50% -50%",
            transition: { duration: 0, delay: 0.5 },
          },
          visible: { rotate: 360, scale: 1, translate: "-50% -50%" },
        }}
        transition={{ duration: 1, delay: 0.5, type: "spring", bounce: 0.5 }}
      />
    </div>

    <p className="self-center">
      <YellowText>2472</YellowText>
      <Label> организирани бягания</Label>
    </p>
    <p className="self-center">
      <YellowText>1.3</YellowText> <Label> милиона км заедно</Label>
    </p>
    <p className="self-center">
      <YellowText>13</YellowText>
      <Label> години дивжение</Label>
    </p>
  </Story>
);

export const OutroThankyou = () => (
  <Story>
    <YellowHeader>Благодарим ти</YellowHeader>

    <p>
      <Label>че беше част от нашето приключение през 2024!</Label>
    </p>
  </Story>
);
