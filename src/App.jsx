import { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./api";

const loadData = async (userID) => {
  const data = await getData(userID);

  console.log("PARSED DATA:");
  console.log(data);
};

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    loadData("18880");
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
        <button onClick={() => loadData(userId)}>Get</button>
      </div>
    </>
  );
};

export default App;
