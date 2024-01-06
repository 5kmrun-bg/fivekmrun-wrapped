import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import "./StatsPage.scss";
import { createStories } from "./stories";

const PADDING = 16;
const StatsStyle = { "--stats-padding": `${PADDING}px` };

export const StatsPage = ({ userId }) => {
  const [stories, setStories] = useState(null);

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats(userId);
      console.log("Data loaded: ");
      console.log(stats);
      const stories = createStories(stats);
      setStories(stories);
    };
    load();
  }, [userId]);

  if (!stories) return <div className="stats-loading">Зареждане...</div>;

  return (
    <div className="stats-page" style={StatsStyle}>
      <Stories
        stories={stories}
        storyContainerStyles={{ borderRadius: 12, overflow: "hidden" }}
        defaultInterval={15000}
        width={Math.min(window.innerWidth - PADDING * 2, 500)}
        height={Math.min(window.innerHeight - PADDING * 2, 900)}
        keyboardNavigation
      />
    </div>
  );
};
