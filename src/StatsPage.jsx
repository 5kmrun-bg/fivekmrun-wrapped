import { useCallback, useEffect, useState } from "react";
import Stories from "react-insta-stories";
import { toBlob } from "html-to-image";

import { loadStats } from "./stats";
import { createStories } from "./stories";
import "./StatsPage.scss";
import { ShareButton } from "./ShareButton";
import { downloadImage } from "./utils";
import usePreloadImages from "./preload-images";

const PADDING = 16;
const StatsStyle = { "--stats-padding": `${PADDING}px` };
const shareFileName = "5kmrun-wrapped.png";

export const StatsPage = ({ userId }) => {
  const [stories, setStories] = useState(null);
  const [showShare, setShowShare] = useState(false);
  const imagesPreloaded = usePreloadImages();

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats(userId);
      const stories = createStories(stats);
      setStories(stories);
    };
    load();
  }, [userId]);

  const handleStoryStart = useCallback((_, stroy) => {
    setShowShare(stroy?.canShare);
  }, []);

  const handleShare = async () => {
    const snapshotElement = document.querySelector(".story")?.parentElement;
    if (!snapshotElement) return;

    const imageBlob = await toBlob(snapshotElement);
    const shareData = {
      files: [
        new File([imageBlob], shareFileName, {
          type: imageBlob.type,
        }),
      ],
      title: "Моята година с 5kmrun.bg",
      text: "Моята година с 5kmrun.bg",
    };

    if (navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
    } else {
      await downloadImage(imageBlob, shareFileName);
    }
  };

  if (!stories || !imagesPreloaded)
    return <div className="stats-loading">Зареждане...</div>;

  return (
    <div className="stats-page" style={StatsStyle}>
      <Stories
        stories={stories}
        storyContainerStyles={{ borderRadius: 12, overflow: "hidden" }}
        defaultInterval={15_000}
        width={Math.min(window.innerWidth - PADDING * 2, 500)}
        height={Math.min(window.innerHeight - PADDING * 2, 900)}
        onStoryStart={handleStoryStart}
        keyboardNavigation
      />
      {showShare && (
        <ShareButton className="share-button" onClick={handleShare} />
      )}
    </div>
  );
};
