/* eslint-disable react/display-name */
import { useEffect, useState } from "react";
import { loadStats } from "./stats";
import Stories from "react-insta-stories";
import joroAvatar from "./assets/joro-avatar.png";
import { formatDistance, formatTime } from "./utils";
import "./StatsPage.scss";
import { YEAR } from "./api/constants";

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
  const { user, officialRuns, selfieRuns, xlRuns } = stats;

  let stories = [
    {
      content: () => (
        <Story bgImage="https://5kmrun.bg/files/header_5_large.jpg">
          <Story.Header>{ YEAR }-та с 5kmrun.bg</Story.Header>
          <Story.Content>
            <p>
              Здравей, {user.name}!
            </p>
            <p>
              Отправяме ти специален поздрав като участник на 5kmrun през {" "}
              { YEAR } г. Благодарим ти, че бяга с нас и че подкрепяш каузата
              ни да водим <span className="accent">активен и здравословен</span> начин на живот.
            </p>
            <p>
              „Всяка събота през Новата година да бягам на 5kmrun!“ е една страхотна резолюция.
              Това пък е и нашето пожелание към теб. Очакваме те и през { YEAR + 1 }-та година!
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
              През { YEAR } ти регистрира <span className="accent">{officialRuns.activeWeeks} участия</span> в същинските бягания на 5kmrun.
            </p>
            <p>
              Това са общо <span className="accent">{formatDistance(officialRuns.totalDistance)}</span>{" "}
              пробягани километра в събота сутрин.
            </p>
            <p>
              И това ти отне общо <span className="accent">{formatTime(officialRuns.totalTime)}</span>.
            </p>
            <p>Откакто започнахме с първото събитие на 5kmrun преди 8 години сме организирали <span className="accent">2472</span> бягания.
            </p>
            <p>
              Пробягали заедно <span className="accent">1346795</span> км прекарвайки в бягане <span className="accent">13 години 11 месеца 4 дни и половина</span>. 
              Това се равнява на 3.5 пъти разстоянието до Луната.
            </p>
            <p>Тези числа нямаше да са същите без твоя принос.</p>
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
              Любимият ти парк за бягане през { YEAR } бе <span className="accent">{topParkName}</span> с{" "}
              {topParkCount} бягания.
            </p>
            {
              (locationBreakdown.length > 1) &&
              <p>Ето и твоята класация на паркове по брой бягания през { YEAR }:</p>
            }
            {(locationBreakdown.length > 1) && locationBreakdown.map(([parkName, parkCount], index) => (
              <p key={index}>
                {index + 1}. {parkName} - {parkCount} бягания
              </p>
            ))}
            {locationBreakdown.length < 6 &&
              <p>
                Нашето предизвикателство за теб за следващата година  е да бягаш и в останалите{" "}
                {6 - locationBreakdown.length} парка, в които нямате бягания през { YEAR }.
              </p>
            }
            {(locationBreakdown.length == 6) &&
              <p>
                Поздравления! Ти посети всички паркове, в които се провеждат същински 5kmrun бягания!
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
                Ти участва в Selfie класацията <span className="accent">{selfieRuns.activeWeeks}</span>{" "}
                седмици през изминалата година.
              </p>
              <p>
                Самостоятелно или заедно в група пробягахме общо <span className="accent">{formatDistance(selfieRuns.totalDistance)}</span>{" "}
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
            <p>Най-доброто време при мъжете държи Исмаил Ссенанджи с <span className="accent">14:29</span>, поставено на 03.09.2022.</p>
            <p>Най-доброто време при жените държи Милица Мирчева с <span className="accent">16:21</span>, поставено на 01.08.2020.</p>
            <p>Ето и твоите най-бързи бягания през изминалата година:</p>
            {(officialRuns?.activeWeeks > 0) &&
              <p>Същинско бягане:<br /> <span className="accent">{officialRuns?.fastestRun?.date?.toLocaleDateString()}, {formatTime(officialRuns?.fastestRun?.time)}</span>
              {(officialRuns?.fastestRun?.id === officialRuns?.fastestRunEver?.id) && <span className="accent"> - нов рекорд!</span>} 
              </p>
            }
            {(selfieRuns?.activeWeeks > 0) &&
              <p>Selfie бягане: <br /> <span className="accent">{selfieRuns?.fastestRun?.startDate?.toLocaleDateString()}, {formatTime(selfieRuns?.fastestRun?.time)}</span>
                {(selfieRuns?.fastestRun?.id === selfieRuns?.fastestRunEver?.id) && <span className="accent"> - нов рекорд!</span>} 
              </p>
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
            <p>Ето и твоите най-добри класирания през { YEAR } година:</p>
            <p>Участникът с най-много първи места в 5kmrun се казва <span className="accent">Цветан Бахчеванов</span>. 
              Той е завоювал цели <span className="accent">237</span> първи места от 482 бягания, организирани в Бургас.</p>
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
                Участвайки в XLRun състезанията, ти не само предизвикваш себе си, но и помагаш 5kmrun
                бяганията да ги има всяка събота безплатно за всички. През { YEAR } ти се включи в <span className="accent">{xlRuns.numRaces}</span>{" "}
                XLRun събития.</p>
              <p>Разстоянието, което пробяга по пътеките в района на София е <span className="accent">{xlRuns.totalDistance}</span> километра</p>
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
