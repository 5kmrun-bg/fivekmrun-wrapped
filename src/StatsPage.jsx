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
              2023 г. Благодарим ви, че бягахте с нас и че ни подкрепяхте в каузата
              ни да водим <span className="accent">активен и здравословен</span> начин на живот.
            </p>
            <p>
              „Всяка събота през Новата година, да бягам на 5kmrun!“ е една страхотна резолюция!
              Това пък е и нашето пожелание към вас! Очакваме ви и през 2024!
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
          <Story.Header>Същински бягания</Story.Header>
          <Story.Content>
            <p>
              През 2023 регистрирахте <span className="accent">{officialRuns.activeWeeks} участия</span> в същинските бягания на 5kmrun.
            </p>
            <p>
              Това са общо <span className="accent">{formatDistance(officialRuns.totalDistance)}</span>{" "}
              пробягани километра в събота сутрин.
            </p>
            <p>
              И това ви отне общо <span className="accent">{formatTime(officialRuns.totalTime)}</span>.
            </p>
            <p>Откакто започнахме с първото събитие на 5kmrun преди 8 години сме организирали 2472 бягания.
            </p>
            <p>
              Пробягали заедно 1346795 км прекарвайки в бягане 13 години 11 месеца 4 дни и половина. Това е 3.5 разстоянието до Луната.
            </p>
            <p>Тези числа нямаше да са същите без вашия принос.</p>
          </Story.Content>
        </Story>
      ),
    });

    stories.push({
      content: () => (
        <Story bgImage="https://5kmrun.bg/files/header_3_large.jpg">
          <Story.Header>Паркове</Story.Header>
          <Story.Content>
            <p>
              Тази година сме изключително радостни, че добавихме нов град, в който се провеждат същински бягания, а именно - Плевен.
              Благодарности за екипа от доброволци, който направи това възможно.
            </p>
            <p>
              Любимият ви парк за бягане през 2023 бе <span className="accent">{topParkName}</span> с{" "}
              {topParkCount} бягания.
            </p>
            {
              (locationBreakdown.length > 1) &&
              <p>Ето и класацията на парковете, в които сте бягали през 2023:</p>
            }
            {(locationBreakdown.length > 1) && locationBreakdown.map(([parkName, parkCount], index) => (
              <p key={index}>
                {index + 1}. {parkName} - {parkCount} бягания
              </p>
            ))}
            {locationBreakdown.length < 6 &&
              <p>
                Нашето предизвикателство за вас за следващата година  е да бягате и в останалите{" "}
                {6 - locationBreakdown.length} парка, в които не сте бягали през 2023.
              </p>
            }
            {(locationBreakdown.length == 6) &&
              <p>
                Поздравления! Вие посетихте всички паркове, в които се провеждат същински 5kmrun бягания!
              </p>
            }
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
                В Selfie класацията, бяхте активни през <span className="accent">{selfieRuns.activeWeeks}</span>{" "}
                седмици.
              </p>
              <p>
                Самостоятелно или заедно в група пробягахте общо <span className="accent">{formatDistance(selfieRuns.totalDistance)}</span>{" "}
                километра из цялата страна за общо <span className="accent">{formatTime(selfieRuns.totalTime)}</span>.
              </p>
            </Story.Content>
          </Story>
        ),
      }]
  };
  stories = [
    ...stories,
    {
      content: () => (
        <Story bgImage="https://5kmrun.bg/files/header_4_large.jpg">
          <Story.Header>Рекорди</Story.Header>
          <Story.Content>
            <p>Най-доброто време при мъжете държи Исмаил Ссенанджи с 14:29 поставено на 03.09.2022.</p>
            <p>Най-доброто време при жените държи Милица Мирчева с 16:21 поставено на 01.08.2020.</p>
            <p>Ето и вашите най-бързи бягания през изминалата година:</p>
            {(officialRuns?.activeWeeks > 0) &&
              <p>Същинско бягане:<br /> <span className="accent">{officialRuns?.fastestRun?.date?.toLocaleDateString()}, {formatTime(officialRuns?.fastestRun?.time)}</span></p>
            }
            {(selfieRuns?.activeWeeks > 0) &&
              <p>Selfie бягане: <br /> <span className="accent">{selfieRuns?.fastestRun?.startDate?.toLocaleDateString()}, {formatTime(selfieRuns?.fastestRun?.time)}</span></p>
            }
          </Story.Content>
        </Story>
      ),
    },
    {
      content: () => (
        <Story bgImage="https://5kmrun.bg/files/header_5_large.jpg">
          <Story.Header>Постижения</Story.Header>
          <Story.Content>
            <p>Ето и вашите най-добри класирания през 2023 година:</p>
            <p>Участникът с най-много първи места в 5kmrun се казва Цветан Бахчеванов. 
              Той е завоювал цели 237 първи места от 482 бягания организирани в Бургас.</p>
          </Story.Content>
        </Story>
      ),
    },
  ];

  if (xlRuns?.numRaces > 0) {
    stories = [
      ...stories,
      {
        content: () => (
          <Story bgImage="https://5kmrun.bg/images/HaderSelfie.png">
            <Story.Header>XLRun Състезания</Story.Header>
            <Story.Content>
              <p>
                Участвайки в XLRun състезанията, вие не само предизвиквате себе си, но и помагате 5kmrun
                бяганията да ги има всяка събота безплатно за всички. През 2023 се включихте в <span className="accent">{xlRuns.numRaces}</span>{" "}
                XLRun събития.</p>
              <p>Разстоянието, което пробягахте по пътеките в района на София е <span className="accent">{xlRuns.totalDistance}</span> километра</p>
              <p>Общо време: <span className="accent">{formatTime(xlRuns.totalTime)}</span></p>
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
