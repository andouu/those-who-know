"use client";
import clsx from "clsx";

export default function Response() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-medium mb-2 text-neutral-400">
        Answer your prompt!
      </span>
      <span className="text-2xl mb-5">Write about a sport you like</span>
      <textarea
        className={clsx(
          "w-96 h-36 px-3 py-2 rounded-xl border-2 border-neutral-200 font-medium mb-3 resize-none",
          "focus:border-purple-600 focus:outline-none focus:border-2"
        )}
        placeholder="Answer here..."
      />
      <button
        className={clsx(
          "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
          "transition-all duration-150 active:scale-95"
        )}
      >
        Submit
      </button>
      <span className="text-neutral-300 mt-5 font-medium">
        Yuchen is writing...
      </span>
    </div>
  );
}
