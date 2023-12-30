import "./App.scss";
import { StatsPage } from "./StatsPage";
import { IDPage } from "./IDPage";

const App = () => {
  const userId = parseInt(window.location.pathname.replace("/", ""));

  return (
    <>
      <h1>5kmrun Wrapped</h1>
      {userId ? <StatsPage userId={userId} /> : <IDPage />}
    </>
  );
};

export default App;
