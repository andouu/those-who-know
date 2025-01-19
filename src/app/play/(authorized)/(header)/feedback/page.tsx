"use client";
import clsx from "clsx";

export default function Feedback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl mb-12">
        <span className="font-semibold">Yuchen&apos;s</span> Feedback.
      </span>
      <div className="flex items-center gap-5">
        <div className="flex flex-col">
          <div className="ml-1 mb-1 flex flex-col">
            <span className="font-medium leading-3">Your Response</span>
            <span>Write a sentence about a sport you like</span>
          </div>
          <textarea
            className={clsx(
              "w-96 h-36 px-3 py-2 rounded-xl border-2 border-neutral-200 font-medium mb-3 resize-none",
              "focus:border-purple-600 focus:outline-none focus:border-2"
            )}
            value="我喜欢打篮球。"
            readOnly
          />
        </div>
        <div className="flex flex-col">
          <div className="ml-1 mb-1 flex flex-col">
            <span className="font-medium leading-3">Feedback</span>
            <span>What was done well? What could be improved?</span>
          </div>
          <textarea
            className={clsx(
              "w-96 h-36 px-3 py-2 rounded-xl border-2 border-neutral-200 font-medium mb-3 resize-none",
              "focus:border-purple-600 focus:outline-none focus:border-2"
            )}
            value="Looks perfect!"
            readOnly
          />
        </div>
      </div>
      <button
        className={clsx(
          "w-72 h-12 mt-10 rounded-full bg-neutral-900 text-center text-white font-medium",
          "transition-all duration-150 active:scale-95"
        )}
      >
        Next Question
      </button>
      <span className="text-neutral-300 mt-5 font-medium">
        Yuchen is ready.
      </span>
    </div>
  );
}
