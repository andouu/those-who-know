"use client";
import clsx from "clsx";
import { useState } from "react";

export default function CreateGame() {
  const [username, setUsername] = useState<string>("");

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <span className="mb-3">
        You&apos;re <span className="font-semibold">creating</span> a room
      </span>
      <form
        className="flex items-center gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className={clsx(
            "w-64 h-12 rounded-full border-2 border-neutral-200 text-center font-medium",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
    </div>
  );
}
