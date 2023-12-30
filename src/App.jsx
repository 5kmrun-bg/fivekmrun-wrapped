import "./App.scss";
import { StatsPage } from "./StatsPage";
import { IDPage } from "./IDPage";

const App = () => {
  const userId = parseInt(window.location.pathname.replace("/", ""));

  return (
    <>
      {userId ? <StatsPage userId={userId} /> : <IDPage />}
    </>
  );
};

export default App;
