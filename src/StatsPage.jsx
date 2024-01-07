import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import "./StatsPage.scss";
import { createStories } from "./stories";
import { imageRef } from "./stories";
import { toPng } from 'html-to-image';

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

  const showShare = () => {
    const shareButton = document.querySelector(".share-button");
    shareButton.style.display = "block";
  }

  const handleShare = async () => {
    const newFile = await toPng(imageRef.current);
    console.log(newFile);
    const data = {
      files: [
        new File([newFile], 'image.png', {
          type: newFile.type,
        }),
      ],
      title: 'Моята година с 5kmrun.bg',
      text: 'Моята година с 5kmrun.bg',
    };

    try {
      if (!navigator.canShare(data)) {
        console.error("Can't share");
      }

      await navigator.share(data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!stories) return <div className="stats-loading">Зареждане...</div>;

  return (
    <div className="stats-page" style={StatsStyle}>
      <Stories
        stories={stories}
        storyContainerStyles={{ borderRadius: 12, overflow: "hidden" }}
        defaultInterval={15000}
        width={Math.min(window.innerWidth - PADDING * 2, 500)}
        height={Math.min(window.innerHeight - PADDING * 2, 900)}
        onStoryEnd={(s, st) => showShare()}
        keyboardNavigation
      />
      <p>
        <button className="share-button" onClick={handleShare}>
        <svg
          t="1580465783605"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="9773"
          width="30"
          height="30"
        >
          <path
            d="M767.99994 585.142857q75.995429 0 129.462857 53.394286t53.394286 129.462857-53.394286 129.462857-129.462857 53.394286-129.462857-53.394286-53.394286-129.462857q0-6.875429 1.170286-19.456l-205.677714-102.838857q-52.589714 49.152-124.562286 49.152-75.995429 0-129.462857-53.394286t-53.394286-129.462857 53.394286-129.462857 129.462857-53.394286q71.972571 0 124.562286 49.152l205.677714-102.838857q-1.170286-12.580571-1.170286-19.456 0-75.995429 53.394286-129.462857t129.462857-53.394286 129.462857 53.394286 53.394286 129.462857-53.394286 129.462857-129.462857 53.394286q-71.972571 0-124.562286-49.152l-205.677714 102.838857q1.170286 12.580571 1.170286 19.456t-1.170286 19.456l205.677714 102.838857q52.589714-49.152 124.562286-49.152z"
            p-id="9774"
            fill="#ffffff"
          ></path>
        </svg>
        </button>
      </p>
    </div>
  );
};
