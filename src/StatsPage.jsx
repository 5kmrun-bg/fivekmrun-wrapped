import { useEffect, useRef, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import "./StatsPage.scss";
import { createStories } from "./stories";
import { imageRef } from "./stories";
import { toBlob } from "html-to-image";

const PADDING = 16;
const StatsStyle = { "--stats-padding": `${PADDING}px` };

var downloadImage = (blob, fileName) => {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const StatsPage = ({ userId }) => {
  const [stories, setStories] = useState(null);
  const storyRef = useRef(null);

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

  const showShare = (args) => {
    console.log(args);
    // const shareButton = document.querySelector(".share-button");
    // shareButton.style.display = "block";
  };

  const handleShare = async () => {
    const imageBlob = await toBlob(
      imageRef.current.parentElement.parentElement.parentElement
    );
    const shareData = {
      files: [
        new File([imageBlob], "image.png", {
          type: imageBlob.type,
        }),
      ],
      title: "Моята година с 5kmrun.bg",
      text: "Моята година с 5kmrun.bg",
    };

    if (navigator.canShare?.(shareData)) {
      await navigator.share(shareData);
    } else {
      await downloadImage(imageBlob, "5kmrun-wrapped.png");
    }
  };

  if (!stories) return <div className="stats-loading">Зареждане...</div>;

  return (
    <div className="stats-page" style={StatsStyle}>
      <Stories
        ref={storyRef}
        stories={stories}
        storyContainerStyles={{ borderRadius: 12, overflow: "hidden" }}
        defaultInterval={1000}
        width={Math.min(window.innerWidth - PADDING * 2, 500)}
        height={Math.min(window.innerHeight - PADDING * 2, 900)}
        onStoryEnd={(...args) => showShare(args)}
        keyboardNavigation
      />
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
        <span>Сподели</span>
      </button>
    </div>
  );
};
