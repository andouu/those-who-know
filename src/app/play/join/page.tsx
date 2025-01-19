"use client";
import { useSocket } from "@/app/context/Socket";
import clsx from "clsx";
import { permanentRedirect, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { HiArrowRight } from "react-icons/hi";

export default function SelectUsername() {
  const [username, setUsername] = useState<string>("");
  const { actions } = useSocket();
  const params = useSearchParams();
  if (!params.get("roomCode")) {
    permanentRedirect("/");
  }

  const roomCode = params.get("roomCode")!;

  const handleJoinRoom = async (e: FormEvent) => {
    e.preventDefault();

    if (username.length === 0) {
      return;
    }

    try {
      await actions.joinRoom(roomCode, username);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <span className="mb-3">
        You&apos;re joining room{" "}
        <span className="font-semibold">{roomCode}</span>
      </span>
      <form className="flex items-center gap-3" onSubmit={handleJoinRoom}>
        <input
          className={clsx(
            "w-64 h-12 rounded-full border-2 border-neutral-200 text-center font-medium",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </form>
    </div>
  );
}
