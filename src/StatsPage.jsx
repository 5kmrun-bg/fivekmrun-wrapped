import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";

const width = 360;
const height = 640;

const stories = [
  {
    url: "https://5kmrun.bg/files/header_5_large.jpg",
  },
  // {
  //   url: "https://5kmrun.bg/images/HaderSelfie.png",
  // },
  {
    url: "https://5kmrun.bg/files/header_2_large.jpg",
  },
  {
    url: "https://5kmrun.bg/files/header_3_large.jpg",
  },
];

export const StatsPage = ({ userId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats(userId);
      setStats(stats);
    };
    load();
  }, [userId]);

  if (!stats) return <div>Зареждане...</div>;

  return (
    <Stories
      stories={stories}
      storyContainerStyles={{ borderRadius: 12, overflow: "hidden" }}
      keyboardNavigation
      storyStyles={{
        width: `${width}px`,
        height: `${height}px`,
        objectFit: "cover",
        maxWidth: "100%",
        maxHeight: "100%",
      }}
    />
  );
};
