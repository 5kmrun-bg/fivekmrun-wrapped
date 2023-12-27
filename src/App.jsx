import { useEffect, useState } from "react";
import "./App.css";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5173/api/"
    : "https://5kmrun.bg/api/";
const USER_API = "selfie/user/";

const getData = async (userID) => {
  const response = await fetch(`${BASE_URL}${USER_API}${userID}`);
  const data = await response.json();
  console.log(data);
};

const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getData("18880");
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
        <button onClick={() => getData(userId)}>Get</button>
      </div>
    </>
  );
};

export default App;
