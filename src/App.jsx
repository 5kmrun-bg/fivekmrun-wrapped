import { useEffect, useState } from "react";
import "./App.css";
import { loadStats } from "./stats";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats("13731");
      setStats(stats);
    };
    load();
  }, []);

  return (
    <>
      <h1>5kmrun Wrapped</h1>
      <div className="card">
        <input
          type="text"
          placeholder="ID"
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={() => loadStats(userId)}>Get</button>

        {stats ? (
          <pre>{JSON.stringify(stats, null, 2)}</pre>
        ) : (
          <div> Loading ... </div>
        )}
      </div>
    </>
  );
};

export default App;
