import { loadStats } from "@/stats";
import { Step } from "@/components/slideshow";
import { OfficialRunsStory } from "./official-runs";
import { XLRunsStory } from "./xl-runs";
import { SelfieRunsStory } from "./selfie-runs";
import { IntroStory } from "./intro";
import { OutroThankyou, OutroTotals } from "./outro";

type Stats = Awaited<ReturnType<typeof loadStats>>;

export const createStories = (stats: Stats) => {
  if (!stats) return null;
  const { user, officialRuns, selfieRuns, xlRuns } = stats;

  const stories: Step[] = [];

  stories.push({
    id: "hi-1",
    content: <IntroStory user={user} />,
  });

  if (officialRuns && officialRuns?.activeWeeks > 0) {
    stories.push({
      id: "official-runs-0",
      content: <OfficialRunsStory officialRuns={officialRuns} />,
    });
  }

  if (selfieRuns && selfieRuns?.activeWeeks > 0) {
    stories.push({
      id: "selfie-runs-1",
      content: <SelfieRunsStory selfieRuns={selfieRuns} />,
    });
  }

  if (xlRuns && xlRuns?.numRaces > 0) {
    stories.push({
      id: "xlrun-1",
      content: <XLRunsStory xlRuns={xlRuns} />,
    });
  }

  stories.push({
    id: "outro-totals",
    content: <OutroTotals />,
  });

  stories.push({
    id: "outro-thanks",
    content: <OutroThankyou />,
  });

  return stories;
};
