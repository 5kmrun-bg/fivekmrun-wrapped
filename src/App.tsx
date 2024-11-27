import { IDPage } from "./id-page";
import { StatsPage } from "./stats-page";

const App = () => {
  const userId = parseInt(window.location.pathname.replace("/", ""));

  return userId ? <StatsPage userId={userId} /> : <IDPage />;
};

export default App;
