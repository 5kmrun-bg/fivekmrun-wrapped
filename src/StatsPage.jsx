/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import joroAvatar from "./assets/joro-avatar.png";
import { formatDistance, formatTime } from "./utils";
import "./StatsPage.scss";

const Story = ({ children, bgImage }) => {
  return (
    <>
      <img className="story-bg-img" src={bgImage} alt="bg" />
      <div className="story-bg-overlay" />
      <div className="story">
        <div className="story-content">{children}</div>
      </div>
    </>
  );
};
Story.Header = ({ children }) => <h1 style={{ marginTop: 5 }}>{children}</h1>;
Story.Content = ({ children }) => <div>{children}</div>;

const createStories = (stats) => {
  if (!stats) return null;
  const { officialRuns, selfieRuns, xlRuns } = stats;

  let stories = [
    {
      content: () => (
        <Story bgImage="https://5kmrun.bg/files/header_5_large.jpg">
          <Story.Header>2023-та с 5kmrun.bg</Story.Header>
          <Story.Content>
            <p>
              Отправяме специален поздрав за всеки един участник на 5kmrun през
              2023 г. и желаем здраве и още повече пробягани километри през
              Новата година!
            </p>
            <img src={joroAvatar} />
          </Story.Content>
        </Story>
      ),
    },
  ];

  if (officialRuns?.activeWeeks > 0) {
    const { locationBreakdown } = officialRuns;
    const [topParkName, topParkCount] = locationBreakdown[0];

    stories.push({
      content: () => (
        <Story bgImage="https://5kmrun.bg/files/header_3_large.jpg">
          <Story.Header>Паркове</Story.Header>
          <Story.Content>
            <p>
              Любимият ви парк за бягане през 2023 бе {topParkName} с{" "}
              {topParkCount} бягания.
            </p>
            <p>Ето и класацията на парковете, в които сте бягали през 2023:</p>
          </Story.Content>
        </Story>
      ),
    });
  }

  if (selfieRuns?.activeWeeks > 0) {
    stories = [
      ...stories,
      {
        content: () => (
          <Story bgImage="https://5kmrun.bg/images/HaderSelfie.png">
            <Story.Header>Selfie бягания</Story.Header>
            <Story.Content>
              <p>
                В Selfie класацията, бяхте активни в {selfieRuns.activeWeeks}{" "}
                седмици.
              </p>
              <p>
                Пробягахте общо {formatDistance(selfieRuns.totalDistance)}{" "}
                километра.
              </p>
              <p>
                И това ви отне общо {formatTime(selfieRuns.totalTime)} часа.
              </p>
            </Story.Content>
          </Story>
        ),
      },
      {
        content: () => (
          <Story bgImage="https://5kmrun.bg/files/header_4_large.jpg">
            <Story.Header>Вашите рекорди</Story.Header>
            <Story.Content>
              <p>Ето и вашите най-бързи бягания през изминалата година:</p>
            </Story.Content>
          </Story>
        ),
      },
      {
        content: () => (
          <Story bgImage="https://5kmrun.bg/files/header_5_large.jpg">
            <Story.Header>Вашите постижения</Story.Header>
            <Story.Content>
              <p>Ето и вашите най-добри класирания през 2023 година:</p>
            </Story.Content>
          </Story>
        ),
      },
    ];
  }

  if (xlRuns?.numRaces > 0) {
    stories = [
      ...stories,
      {
        content: () => (
          <Story bgImage="https://5kmrun.bg/images/HaderSelfie.png">
            <Story.Header>XLRuns</Story.Header>
            <Story.Content>
              <p>Брой участия в XLRuns: {xlRuns.numRaces}</p>
              <p>Пробягани километри: {xlRuns.totalDistance}</p>
              <p>Общо време: {formatTime(xlRuns.totalTime)}</p>
            </Story.Content>
          </Story>
        ),
      },
    ];
  }

  return stories;
};

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
    <div className="stats-page">
      <Stories
        stories={stories}
        storyContainerStyles={{ borderRadius: 12, overflow: "hidden" }}
        defaultInterval={5000}
        keyboardNavigation
      />
    </div>
  );
};
