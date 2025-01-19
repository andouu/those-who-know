"use client";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Home() {
  const [roomCode, setRoomCode] = useState<string>("");
  const router = useRouter();

  const handleJoin = (e: FormEvent) => {
    e.preventDefault();
    router.push(`/play/join?roomCode=${roomCode}`);
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <span className="font-bold mb-3 text-xl">THOSE WHO KNOW</span>
      <form className="flex items-center gap-3" onSubmit={handleJoin}>
        <input
          className={clsx(
            "w-64 h-12 rounded-full border-2 border-neutral-200 text-center font-medium",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          value={roomCode}
          onChange={(e) => setRoomCode(e.target.value)}
          placeholder="Room Code"
        />
      </form>
      <span className="font-medium text-sm text-neutral-300">OR</span>
      <Link href="/create">
        <button
          className={clsx(
            "w-64 h-12 rounded-full bg-neutral-900 text-white font-medium",
            "transition-all duration-150 active:scale-95"
          )}
        >
          Create Room
        </button>
      </Link>
    </div>
  );
}
