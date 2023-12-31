import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import joroAvatar from "./assets/joro-avatar.png";
import {formatDistance, formatTime} from "./utils";

const width = 360;
const height = 640;

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

  const stories = [
    {
      content: (props) => (
        <div style={{ backgroundImage: "url('https://5kmrun.bg/files/header_5_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
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
        <div style={{ backgroundImage: "url('https://5kmrun.bg/files/header_2_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
            <h1 style={{ marginTop: 5 }}>Същински бягания</h1>
            <div>
              През тази година участвахте в {stats?.officialRuns.activeWeeks} бягания.
            </div>
            <div>
              Пробягахте общо {formatDistance(stats?.officialRuns.totalDistance)} километра.
            </div>
            <div>
              И това ви отне общо {formatTime(stats?.officialRuns.totalTime)}.
            </div>
          </div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div style={{ backgroundImage: "url('https://5kmrun.bg/files/header_3_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
            <h1 style={{ marginTop: 5 }}>Паркове</h1>
            <div>
              Любимият ви парк за бягане през 2023 бе ... с ... бягания.
            </div>
            <div>
              Ето и класацията на парковете, в които сте бягали през 2023:
            </div>
          </div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div style={{ backgroundImage: "url('https://5kmrun.bg/images/HaderSelfie.png')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
            <h1 style={{ marginTop: 5 }}>Selfie бягания</h1>
            <div>
              В Selfie класацията, бяхте активни в {stats?.selfieRuns.activeWeeks} седмици.
            </div>
            <div>
              Пробягахте общо {formatDistance(stats?.selfieRuns.totalDistance)} километра.
            </div>
            <div>
              И това ви отне общо {formatTime(stats?.selfieRuns.totalTime)} часа.
            </div>
          </div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div style={{ backgroundImage: "url('https://5kmrun.bg/files/header_4_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
            <h1 style={{ marginTop: 5 }}>Вашите рекорди</h1>
            <div>
              Ето и вашите най-бързи бягания през изминалата година:
            </div>
          </div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div style={{ backgroundImage: "url('https://5kmrun.bg/files/header_5_large.jpg')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
            <h1 style={{ marginTop: 5 }}>Вашите постижения</h1>
            <div>
              Ето и вашите най-добри класирания през 2023 година:
            </div>
          </div>
        </div>
      ),
    },
    {
      content: (props) => (
        <div style={{ backgroundImage: "url('https://5kmrun.bg/images/HaderSelfie.png')", backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div style={{ backgroundColor: 'rgba(0,0,0,0.5)', padding: "20px" }}>
            <h1 style={{ marginTop: 5 }}>XLRuns</h1>
            <div>
              Брой участия в XLRuns: {stats?.xlRuns.activeWeeks}
            </div>
            <div>
              Пробягани километри: {formatDistance(stats?.xlRuns.totalDistance)}
            </div>
            <div>
              Общо време: {formatTime(stats?.xlRuns.totalTime)}
            </div>
          </div>
        </div>
      ),
    },
  ];

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
