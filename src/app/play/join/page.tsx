"use client";
import clsx from "clsx";
import { HiArrowRight } from "react-icons/hi";

export default function SelectUsername() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <span className="mb-3">
        You&apos;re joining room{" "}
        <span className="font-semibold">{"AB912K"}</span>
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
        />
        <button
          className={clsx(
            "w-12 h-12 flex items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-150",
            "active:scale-90"
          )}
        >
          <HiArrowRight />
        </button>
      </form>
    </div>
  );
}
