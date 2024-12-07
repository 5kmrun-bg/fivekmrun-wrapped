import { Story } from "@/components/story";
import { YellowHeader, YellowText, Label } from "./common";

export const OutroTotals = () => (
  <Story>
    <p>
      <YellowText>2472</YellowText>
      <Label> организирани бягания</Label>
    </p>
    <p>
      <YellowText>1.3</YellowText> <Label> милиона км заедно</Label>
    </p>
    <p>
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
