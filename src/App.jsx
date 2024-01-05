import { StatsPage } from "./StatsPage";
import { IDPage } from "./IDPage";
import usePreloadImages from "./use-preload-images";

const App = () => {
  usePreloadImages();
  const userId = parseInt(window.location.pathname.replace("/", ""));

  return (
    <>
      {userId ? <StatsPage userId={userId} /> : <IDPage />}
    </>
  );
};

export default App;
