import { FormEvent, useState } from "react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export const IDPage = () => {
  const [userId, setUserId] = useState(null as string | null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const origin = window.location.origin;
    window.location.href = `${origin}/${userId}`;
  };

  return (
    <form
      className="flex flex-col items-stretch place-content-center gap-4 w-dvh mx-auto h-dvh max-w-[20rem]"
      onSubmit={handleSubmit}
    >
      <img
        src="logo.png"
        alt="logo"
        className="text-md max-w-32 rounded-xl self-center mb-4"
      />

      <Input
        type="number"
        inputMode="numeric"
        placeholder="номер"
        onChange={(e) => setUserId(e.target.value)}
        className="bg-neutral-700 border-neutral-500 rounded "
      />
      <Button className="text-md bg-neutral-600 hover:bg-neutral-700 text-white rounded">
        Давай!
      </Button>
    </form>
  );
};
