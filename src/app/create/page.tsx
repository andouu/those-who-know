"use client";
import clsx from "clsx";
import { FormEvent, useState } from "react";
import { useSocket } from "../context/Socket";

export default function CreateGame() {
  const [username, setUsername] = useState<string>("");
  const [creating, setCreating] = useState<boolean>(false);
  const socket = useSocket();

  const handleCreateRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (username.length === 0) {
      return;
    }

    try {
      setCreating(true);
      await socket.actions.createRoom(username);
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <span className="mb-3">
        You&apos;re <span className="font-semibold">creating</span> a room
      </span>
      <form className="flex items-center gap-3" onSubmit={handleCreateRoom}>
        <input
          className={clsx(
            "w-64 h-12 rounded-full border-2 border-neutral-200 text-center font-medium",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={creating}
        />
      </form>
    </div>
  );
}
