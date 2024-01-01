import { useState } from "react";

export const IDPage = () => {
  const [userId, setUserId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const origin = window.location.origin;
    window.location.href = `${origin}/${userId}`;
  };

  // TODO: Load user on input change

  return (
    <form className="id-form" onSubmit={handleSubmit}>
      <img src="logo.png" alt="logo" className="logo"/>

      <input
        type="number"
        placeholder="номер"
        onChange={(e) => setUserId(e.target.value)}
      />
      <button>Давай!</button>
    </form>
  );
};
