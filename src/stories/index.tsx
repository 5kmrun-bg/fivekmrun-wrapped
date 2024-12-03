import { loadStats } from "@/stats";
import { Step } from "@/components/slideshow";
import { OfficialRunsStory } from "./official-runs";
import { XLRunsStory } from "./xl-runs";
import { SelfieRunsStory } from "./selfie-runs";
import { IntroStory } from "./intro";
import { OutroThankyou, OutroTotals } from "./outro";

type Stats = Awaited<ReturnType<typeof loadStats>>;

// const createOfficialRunsStories = (
//   officialRuns: NonNullable<Stats["officialRuns"]>
// ) => {
//   // const { locationBreakdown } = officialRuns;
//   // const [topParkName, topParkCount] = locationBreakdown[0];

//   return [
//     {
//       id: "official-runs-0",
//       content: <OfficialRunsStory officialRuns={officialRuns} />,
//     },

//     // {
//     //   id: "official-runs-1",
//     //   content: (
//     //     <Story className="bg-violet-400">
//     //       <p>
//     //         През {YEAR} ти регистрира{" "}
//     //         <span className="text-accent">
//     //           {officialRuns.activeWeeks} участия
//     //         </span>{" "}
//     //         в същинските бягания на 5kmrun.
//     //       </p>
//     //       <p>
//     //         Това са общо{" "}
//     //         <span className="text-accent">
//     //           {formatDistance(officialRuns.totalDistance)}
//     //         </span>{" "}
//     //         пробягани километра в събота сутрин.
//     //       </p>
//     //       <p>
//     //         И това ти отне общо{" "}
//     //         <span className="text-accent">
//     //           {formatTime(officialRuns.totalTime)}
//     //         </span>
//     //         .
//     //       </p>
//     //     </Story>
//     //   ),
//     // },
//     // {
//     //   id: "official-runs-2",
//     //   content: (
//     //     <Story className="bg-violet-400">
//     //       <p>
//     //         Откакто започнахме с първото събитие на 5kmrun преди повече от 10
//     //         години сме организирали <span className="text-accent">2472</span>{" "}
//     //         бягания.
//     //       </p>
//     //       <p>
//     //         Пробягали заедно <span className="text-accent">1346795</span> км
//     //         прекарвайки в бягане{" "}
//     //         <span className="text-accent">
//     //           13 години 11 месеца 4 дни и половина
//     //         </span>
//     //         . Това се равнява на 3.5 пъти разстоянието до Луната.
//     //       </p>
//     //       <p>Тези числа нямаше да са същите без твоя принос.</p>
//     //     </Story>
//     //   ),
//     // },
//     // {
//     //   content: () => (
//     //     <Story bgImage={BG.run} bgPosition="right">
//     //       <Story.Header>Паркове</Story.Header>
//     //       <Story.Content>
//     //         <p>
//     //           Тази година сме изключително радостни, че добавихме Плевен към
//     //           градовете, в които се провеждат същински бягания.
//     //         </p>
//     //         <p>
//     //           Твоят любимият парк за бягане през {YEAR} бе{" "}
//     //           <span className="text-accent">{topParkName}</span> с {topParkCount}{" "}
//     //           бягания.
//     //         </p>
//     //         {locationBreakdown.length > 1 && (
//     //           <p>
//     //             Ето и твоята класация на паркове по брой бягания през {YEAR}:
//     //           </p>
//     //         )}
//     //         {locationBreakdown.length > 1 && (
//     //           <ol>
//     //             {locationBreakdown.map(([parkName, parkCount], index) => (
//     //               <li key={index}>
//     //                 {parkName} - {parkCount} бягания
//     //               </li>
//     //             ))}
//     //           </ol>
//     //         )}
//     //         {locationBreakdown.length < 6 && (
//     //           <p>
//     //             Нашето предизвикателство за теб за следващата година е да бягаш
//     //             и в останалите {6 - locationBreakdown.length} парка, в които
//     //             нямаш бягания през {YEAR}.
//     //           </p>
//     //         )}
//     //         {locationBreakdown.length == 6 && (
//     //           <p>
//     //             Поздравления! Ти посети всички паркове, в които се провеждат
//     //             същински 5kmrun бягания!
//     //           </p>
//     //         )}
//     //       </Story.Content>
//     //     </Story>
//     //   ),
//     // },
//   ];
// };

// const createSummaryStories = ({ user, officialRuns, selfieRuns, xlRuns }) => [
//   {
//     canShare: true,
//     content: () => (
//       <Story bgImage={BG.run} centerContent>
//         <Story.Content>
//           <div>
//             <h1 style={{ marginBottom: "24px" }}>{YEAR}-та с 5kmrun.bg</h1>
//             <p>
//               Бегач: <span className="text-accent">{user?.name}</span>
//             </p>
//             {user.status && (
//               <p>
//                 Статус: <span className="text-accent">{user.status}</span>
//               </p>
//             )}
//             <p>
//               Общо участия в събития на 5kmrun:{" "}
//               <span className="text-accent">
//                 {officialRuns?.activeWeeks +
//                   selfieRuns?.activeWeeks +
//                   xlRuns?.numRaces}
//               </span>
//             </p>
//             <p>
//               Общо пробягани километри:{" "}
//               <span className="text-accent">
//                 {formatDistance(
//                   officialRuns?.totalDistance +
//                     selfieRuns?.totalDistance +
//                     xlRuns?.totalDistance
//                 )}
//                 километра
//               </span>
//             </p>
//             <p>
//               Общо време в бягане с 5kmrun:{" "}
//               <span className="text-accent">
//                 {formatTime(
//                   officialRuns?.totalTime +
//                     selfieRuns?.totalTime +
//                     xlRuns?.totalTime
//                 )}
//               </span>
//             </p>
//             <p>
//               Най-добро време за 5 километра:{" "}
//               <span className="text-accent">
//                 {formatTime(
//                   Math.min(
//                     officialRuns?.fastestRun?.time,
//                     selfieRuns?.fastestRun?.time
//                   )
//                 )}
//               </span>
//             </p>
//           </div>
//         </Story.Content>
//       </Story>
//     ),
//   },
// ];

// const createAchievementsStories = ({ officialRuns, selfieRuns, xlRuns }) => [
//   {
//     content: () => (
//       <Story bgImage={BG.kids}>
//         <Story.Header>Рекорди</Story.Header>
//         <Story.Content>
//           <p>
//             Най-доброто време при мъжете държи Исмаил Ссенанджи с{" "}
//             <span className="text-accent">14:29</span>, поставено на 03.09.2022.
//           </p>
//           <p>
//             Най-доброто време при жените държи Милица Мирчева с{" "}
//             <span className="text-accent">16:21</span>, поставено на 01.08.2020.
//           </p>
//           <p>Ето и твоите най-бързи бягания през изминалата година:</p>
//           {officialRuns?.activeWeeks > 0 && (
//             <p>
//               Същинско бягане:
//               <br />{" "}
//               <span className="text-accent">
//                 {officialRuns?.fastestRun?.date?.toLocaleDateString()},{" "}
//                 {formatTime(officialRuns?.fastestRun?.time)}
//               </span>
//               {officialRuns?.fastestRun?.id ===
//                 officialRuns?.fastestRunEver?.id && (
//                 <span className="text-accent"> - нов рекорд!</span>
//               )}
//             </p>
//           )}
//           {selfieRuns?.activeWeeks > 0 && (
//             <p>
//               Selfie бягане: <br />{" "}
//               <span className="text-accent">
//                 {selfieRuns?.fastestRun?.startDate?.toLocaleDateString()},{" "}
//                 {formatTime(selfieRuns?.fastestRun?.time)}
//               </span>
//               {selfieRuns?.fastestRun?.id ===
//                 selfieRuns?.fastestRunEver?.id && (
//                 <span className="text-accent"> - нов рекорд!</span>
//               )}
//             </p>
//           )}
//         </Story.Content>
//       </Story>
//     ),
//   },
//   {
//     content: () => {
//       const bestOfficial = officialRuns?.bestRelativePosition;
//       const bestSlefie = selfieRuns?.bestPositionRun;
//       const bestXLRun = xlRuns?.bestPositionRun;
//       return (
//         <Story bgImage={BG.xlrun}>
//           <Story.Header>Постижения</Story.Header>
//           <Story.Content>
//             <p>
//               Участникът с най-много първи места в 5kmrun се казва{" "}
//               <span className="text-accent">Цветан Бахчеванов</span>. Той е завоювал
//               цели <span className="text-accent">237</span> първи места от 482
//               бягания, организирани в Бургас.
//             </p>
//             <p>Ето и твоите най-добри класирания през {YEAR} година:</p>
//             {bestOfficial && (
//               <p>
//                 Същинско бягане:
//                 <br />{" "}
//                 <span className="text-accent">
//                   {`${bestOfficial.date.toLocaleDateString()} (${
//                     bestOfficial.location
//                   }) - ${bestOfficial.position} място от ${
//                     bestOfficial.totalRunners
//                   } участници`}
//                 </span>
//               </p>
//             )}
//             {bestSlefie && (
//               <p>
//                 Selfie бягане: <br />{" "}
//                 <span className="text-accent">
//                   {`${bestSlefie.startDate.toLocaleDateString()} - ${
//                     bestSlefie.position
//                   } място`}
//                 </span>
//               </p>
//             )}
//             {bestXLRun && (
//               <p>
//                 XLRun състезание:
//                 <br />{" "}
//                 <span className="text-accent">
//                   {`${bestXLRun.date.toLocaleDateString()} (${
//                     bestXLRun.location
//                   }) - ${bestXLRun.position} място от ${
//                     bestXLRun.totalRunners
//                   } участници`}
//                 </span>
//               </p>
//             )}
//           </Story.Content>
//         </Story>
//       );
//     },
//   },
// ];

export const createStories = (stats: Stats) => {
  if (!stats) return null;
  const { user, officialRuns, selfieRuns, xlRuns } = stats;

  const stories: Step[] = [
    {
      id: "hi-1",
      content: <IntroStory user={user} />,
    },
  ];

  if (officialRuns && officialRuns?.activeWeeks > 0) {
    stories.push({
      id: "official-runs-0",
      content: <OfficialRunsStory officialRuns={officialRuns} />,
    });
  }

  if (selfieRuns && selfieRuns?.activeWeeks > 0) {
    stories.push({
      id: "selfie-runs-1",
      content: <SelfieRunsStory selfieRuns={selfieRuns} />,
    });
  }

  if (xlRuns && xlRuns?.numRaces > 0) {
    stories.push({
      id: "xlrun-1",
      content: <XLRunsStory xlRuns={xlRuns} />,
    });
  }

  stories.push({
    id: "outro-totals",
    content: <OutroTotals />,
  });

  stories.push({
    id: "outro-thanks",
    content: <OutroThankyou />,
  });

  return stories;
};
