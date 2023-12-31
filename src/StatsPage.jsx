import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import joroAvatar from "./assets/joro-avatar.png";

const width = 360;
const height = 640;

const stories = [
  {
      content: (props) => (
          <div style={{  backgroundImage: "url('https://5kmrun.bg/files/header_5_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)'}}>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px"}}>
              <h1 style={{ marginTop: 5 }}>2023-та с 5kmrun.bg</h1>
              <div>
                Отправяме специален поздрав за всеки един участник на 5kmrun през 2023 г. и желаем здраве и още повече пробягани километри през Новата година!
              </div>
              <img src={joroAvatar} />
            </div>
          </div>
      ),
      },
      {
      content: (props) => (
        <div style={{  backgroundImage: "url('https://5kmrun.bg/files/header_2_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px"}}>
            <h1 style={{ marginTop: 5 }}>Същински бягания</h1>
            <div>
              През тази година участвахте в ... бягания.
            </div>
            <div>
              Пробягахте общо ... километра.
            </div>
            <div>
              И това ви отне общо ... часа.
            </div>
          </div>
        </div>
    ),
  },
  // {
  //   url: "https://5kmrun.bg/images/HaderSelfie.png",
  // },
  {
    url: "https://5kmrun.bg/files/header_2_large.jpg",
    header: "2023-та година с 5kmrun.bg",

  },
  {
    url: "https://5kmrun.bg/files/header_3_large.jpg",
    header: "2023-та година с 5kmrun.bg",

  },
];

export const StatsPage = ({ userId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats(userId);
      console.log("Data loaded: ");
      console.log(stats);
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
