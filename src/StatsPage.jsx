import { useEffect, useState } from "react";
import { loadStats } from "./stats";

export const StatsPage = ({ userId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const load = async () => {
      const stats = await loadStats(userId);
      setStats(stats);
    };
    load();
  }, [userId]);

  return (
    <div className="card">
      {stats ? (
        <pre>{JSON.stringify(stats, null, 2)}</pre>
      ) : (
        <div> Loading ... </div>
      )}
    </div>
  );
};
