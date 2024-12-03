/* eslint-disable @typescript-eslint/no-explicit-any */

import { Story } from "@/components/story";
import { YellowHeader, YellowNumber, Label } from "./common";

export const OutroTotals = () => (
  <Story>
    <p>
      <YellowNumber>2472</YellowNumber>
      <Label> организирани бягания</Label>
    </p>
    <p>
      <YellowNumber>1.3</YellowNumber> <Label> милиона км заедно</Label>
    </p>
    <p>
      <YellowNumber>13</YellowNumber>
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
