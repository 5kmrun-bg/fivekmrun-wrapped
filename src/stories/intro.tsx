/* eslint-disable @typescript-eslint/no-explicit-any */

import { Story } from "@/components/story";
import { loadStats } from "@/stats";

type Stats = Awaited<ReturnType<typeof loadStats>>;

type Props = {
  user: NonNullable<Stats["user"]>;
};

export const IntroStory = ({ user }: Props) => (
  <Story>
    <p>Здравей, {user.name}!</p>
  </Story>
);
