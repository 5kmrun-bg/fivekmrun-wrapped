import { useState } from "react";

export const IDPage = () => {
  const [userId, setUserId] = useState(null);

  const handleSubmit = () => {
    const origin = window.location.origin;
    window.location.href = `${origin}/${userId}`;
  };

  // TODO: Load user on input change

  return (
    <div className="id-form">
      <input
        type="number"
        placeholder="ID"
        onChange={(e) => setUserId(e.target.value)} />
      <button onClick={handleSubmit}>GO</button>
    </div>
  );
};
