/* eslint-disable react/display-name */
import joroAvatar from "./assets/joro-avatar.png";
import { formatDistance, formatTime } from "./utils";
import "./StatsPage.scss";
import { YEAR } from "./api/constants";
import { BG } from "./preload-images";

const Story = ({
  children,
  bgImage,
  bgPosition = "center",
  centerContent = false,
}) => {
  return (
    <>
      <img className={`story-bg-img ${bgPosition}`} src={bgImage} alt="bg" />
      <div className="story-bg-overlay" />
      <div className="story">
        <div className={`story-content ${centerContent && "centered"}`}>
          {children}
        </div>
      </div>
    </>
  );
};
Story.Header = ({ children }) => <h1>{children}</h1>;
Story.Content = ({ children }) => <>{children}</>;

const createOfficialRunsStories = (officialRuns) => {
  const { locationBreakdown } = officialRuns;
  const [topParkName, topParkCount] = locationBreakdown[0];

  return [
    {
      duration: 20_000,
      content: () => (
        <Story bgImage={BG.run} bgPosition="left">
          <Story.Header>Същински бягания</Story.Header>
          <Story.Content>
            <p>
              През {YEAR} ти регистрира{" "}
              <span className="accent">{officialRuns.activeWeeks} участия</span>{" "}
              в същинските бягания на 5kmrun.
            </p>
            <p>
              Това са общо{" "}
              <span className="accent">
                {formatDistance(officialRuns.totalDistance)}
              </span>{" "}
              пробягани километра в събота сутрин.
            </p>
            <p>
              И това ти отне общо{" "}
              <span className="accent">
                {formatTime(officialRuns.totalTime)}
              </span>
              .
            </p>
            <p>
              Откакто започнахме с първото събитие на 5kmrun преди повече от 10 години сме
              организирали <span className="accent">2472</span> бягания.
            </p>
            <p>
              Пробягали заедно <span className="accent">1346795</span> км
              прекарвайки в бягане{" "}
              <span className="accent">
                13 години 11 месеца 4 дни и половина
              </span>
              . Това се равнява на 3.5 пъти разстоянието до Луната.
            </p>
            <p>Тези числа нямаше да са същите без твоя принос.</p>
          </Story.Content>
        </Story>
      ),
    },
    {
      content: () => (
        <Story bgImage={BG.run} bgPosition="right">
          <Story.Header>Паркове</Story.Header>
          <Story.Content>
            <p>
              Тази година сме изключително радостни, че добавихме Плевен към
              градовете, в които се провеждат същински бягания.
            </p>
            <p>
              Твоят любимият парк за бягане през {YEAR} бе{" "}
              <span className="accent">{topParkName}</span> с {topParkCount}{" "}
              бягания.
            </p>
            {locationBreakdown.length > 1 && (
              <p>
                Ето и твоята класация на паркове по брой бягания през {YEAR}:
              </p>
            )}
            {locationBreakdown.length > 1 && (
              <ol>
                {locationBreakdown.map(([parkName, parkCount], index) => (
                  <li key={index}>
                    {parkName} - {parkCount} бягания
                  </li>
                ))}
              </ol>
            )}
            {locationBreakdown.length < 6 && (
              <p>
                Нашето предизвикателство за теб за следващата година е да бягаш
                и в останалите {6 - locationBreakdown.length} парка, в които
                нямаш бягания през {YEAR}.
              </p>
            )}
            {locationBreakdown.length == 6 && (
              <p>
                Поздравления! Ти посети всички паркове, в които се провеждат
                същински 5kmrun бягания!
              </p>
            )}
          </Story.Content>
        </Story>
      ),
    },
  ];
};

const createSelfieStories = (selfieRuns) => [
  {
    duration: 10_000,
    content: () => (
      <Story bgImage={BG.selfie} bgPosition="selfie">
        <Story.Header>Selfie бягания</Story.Header>
        <Story.Content>
          <p>
            Ти участва в Selfie класацията{" "}
            <span className="accent">{selfieRuns.activeWeeks}</span> седмици
            през изминалата година.
          </p>
          <p>
            Самостоятелно или заедно в група пробягахме общо{" "}
            <span className="accent">
              {formatDistance(selfieRuns.totalDistance)}
            </span>{" "}
            километра из цялата страна за общо{" "}
            <span className="accent">{formatTime(selfieRuns.totalTime)}</span>.
          </p>
        </Story.Content>
      </Story>
    ),
  },
];

const createXLRunStories = (xlRuns) => [
  {
    content: () => (
      <Story bgImage={BG.xlrun} bgPosition="right">
        <Story.Header>XLRun Състезания</Story.Header>
        <Story.Content>
          <p>
            Участвайки в XLRun състезанията, ти не само предизвикваш себе си, но
            и помагаш 5kmrun бяганията да ги има всяка събота безплатно за
            всички. През {YEAR} ти се включи в{" "}
            <span className="accent">{xlRuns.numRaces}</span> XLRun събития.
          </p>
          <p>
            Разстоянието, което пробяга по пътеките в района на София е{" "}
            <span className="accent">
              {formatDistance(xlRuns.totalDistance)}
            </span>{" "}
            километра
          </p>
          <p>
            Общо време:{" "}
            <span className="accent">{formatTime(xlRuns.totalTime)}</span>
          </p>
        </Story.Content>
      </Story>
    ),
  },
];

const createSummaryStories = ({ user, officialRuns, selfieRuns, xlRuns }) => [
  {
    canShare: true,
    content: () => (
      <Story bgImage={BG.run} centerContent>
        <Story.Content>
          <div>
            <h1 style={{ marginBottom: "24px" }}>{YEAR}-та с 5kmrun.bg</h1>
            <p>
              Бегач: <span className="accent">{user?.name}</span>
            </p>
            {user.status && (
              <p>
                Статус: <span className="accent">{user.status}</span>
              </p>
            )}
            <p>
              Общо участия в събития на 5kmrun:{" "}
              <span className="accent">
                {officialRuns?.activeWeeks +
                  selfieRuns?.activeWeeks +
                  xlRuns?.numRaces}
              </span>
            </p>
            <p>
              Общо пробягани километри:{" "}
              <span className="accent">
                {formatDistance(
                  officialRuns?.totalDistance +
                    selfieRuns?.totalDistance +
                    xlRuns?.totalDistance
                )}
                километра
              </span>
            </p>
            <p>
              Общо време в бягане с 5kmrun:{" "}
              <span className="accent">
                {formatTime(
                  officialRuns?.totalTime +
                    selfieRuns?.totalTime +
                    xlRuns?.totalTime
                )}
              </span>
            </p>
            <p>
              Най-добро време за 5 километра:{" "}
              <span className="accent">
                {formatTime(
                  Math.min(
                    officialRuns?.fastestRun?.time,
                    selfieRuns?.fastestRun?.time
                  )
                )}
              </span>
            </p>
          </div>
        </Story.Content>
      </Story>
    ),
  },
];

const createAchievementsStories = ({ officialRuns, selfieRuns, xlRuns }) => [
  {
    content: () => (
      <Story bgImage={BG.kids}>
        <Story.Header>Рекорди</Story.Header>
        <Story.Content>
          <p>
            Най-доброто време при мъжете държи Исмаил Ссенанджи с{" "}
            <span className="accent">14:29</span>, поставено на 03.09.2022.
          </p>
          <p>
            Най-доброто време при жените държи Милица Мирчева с{" "}
            <span className="accent">16:21</span>, поставено на 01.08.2020.
          </p>
          <p>Ето и твоите най-бързи бягания през изминалата година:</p>
          {officialRuns?.activeWeeks > 0 && (
            <p>
              Същинско бягане:
              <br />{" "}
              <span className="accent">
                {officialRuns?.fastestRun?.date?.toLocaleDateString()},{" "}
                {formatTime(officialRuns?.fastestRun?.time)}
              </span>
              {officialRuns?.fastestRun?.id ===
                officialRuns?.fastestRunEver?.id && (
                <span className="accent"> - нов рекорд!</span>
              )}
            </p>
          )}
          {selfieRuns?.activeWeeks > 0 && (
            <p>
              Selfie бягане: <br />{" "}
              <span className="accent">
                {selfieRuns?.fastestRun?.startDate?.toLocaleDateString()},{" "}
                {formatTime(selfieRuns?.fastestRun?.time)}
              </span>
              {selfieRuns?.fastestRun?.id ===
                selfieRuns?.fastestRunEver?.id && (
                <span className="accent"> - нов рекорд!</span>
              )}
            </p>
          )}
        </Story.Content>
      </Story>
    ),
  },
  {
    content: () => {
      const bestOfficial = officialRuns?.bestRelativePosition;
      const bestSlefie = selfieRuns?.bestPositionRun;
      const bestXLRun = xlRuns?.bestPositionRun;
      return (
        <Story bgImage={BG.xlrun}>
          <Story.Header>Постижения</Story.Header>
          <Story.Content>
            <p>
              Участникът с най-много първи места в 5kmrun се казва{" "}
              <span className="accent">Цветан Бахчеванов</span>. Той е завоювал
              цели <span className="accent">237</span> първи места от 482
              бягания, организирани в Бургас.
            </p>
            <p>Ето и твоите най-добри класирания през {YEAR} година:</p>
            {bestOfficial && (
              <p>
                Същинско бягане:
                <br />{" "}
                <span className="accent">
                  {`${bestOfficial.date.toLocaleDateString()} (${
                    bestOfficial.location
                  }) - ${bestOfficial.position} място от ${
                    bestOfficial.totalRunners
                  } участници`}
                </span>
              </p>
            )}
            {bestSlefie && (
              <p>
                Selfie бягане: <br />{" "}
                <span className="accent">
                  {`${bestSlefie.startDate.toLocaleDateString()} - ${
                    bestSlefie.position
                  } място`}
                </span>
              </p>
            )}
            {bestXLRun && (
              <p>
                XLRun състезание:
                <br />{" "}
                <span className="accent">
                  {`${bestXLRun.date.toLocaleDateString()} (${
                    bestXLRun.location
                  }) - ${bestXLRun.position} място от ${
                    bestXLRun.totalRunners
                  } участници`}
                </span>
              </p>
            )}
          </Story.Content>
        </Story>
      );
    },
  },
];

export const createStories = (stats) => {
  if (!stats) return null;
  const { user, officialRuns, selfieRuns, xlRuns } = stats;

  let stories = [
    {
      content: () => (
        <Story bgImage={BG.run}>
          <Story.Header>{YEAR}-та с 5kmrun.bg</Story.Header>
          <Story.Content>
            <img src={joroAvatar} className="joro-avatar" />
            <p>Здравей, {user.name}!</p>
            <p>
              Отправяме ти специален поздрав като участник на 5kmrun през {YEAR}{" "}
              г. Благодарим ти, че бяга с нас и че подкрепяш каузата ни да водим{" "}
              <span className="accent">активен и здравословен</span> начин на
              живот.
            </p>
            <p>
              „Всяка събота през Новата година да бягам на 5kmrun!“ е една
              страхотна резолюция. Това пък е и нашето пожелание към теб.
              Очакваме те и през {YEAR + 1}-та година!
            </p>
          </Story.Content>
        </Story>
      ),
    },
  ];

  if (officialRuns?.activeWeeks > 0) {
    stories.push(...createOfficialRunsStories(officialRuns));
  }

  if (selfieRuns?.activeWeeks > 0) {
    stories.push(...createSelfieStories(selfieRuns));
  }

  if (xlRuns?.numRaces > 0) {
    stories.push(...createXLRunStories(xlRuns));
  }

  stories.push(...createAchievementsStories(stats));

  if (
    officialRuns?.activeWeeks > 0 ||
    selfieRuns?.activeWeeks > 0 ||
    xlRuns?.numRaces > 0
  ) {
    stories.push(...createSummaryStories(stats));
  }

  return stories;
};
