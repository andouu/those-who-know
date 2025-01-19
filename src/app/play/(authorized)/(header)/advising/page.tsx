import clsx from "clsx";

export default function Advising() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl mb-12">
        Rate <span className="font-semibold">Yuchen&apos;s</span> Answer.
      </span>
      <div className="flex items-center gap-5">
        <div className="flex flex-col">
          <div className="ml-1 mb-1 flex flex-col">
            <span className="font-medium leading-3">Prompt</span>
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
            placeholder="e.g. Good sentence structure, but incorrect vocab."
          />
        </div>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <button
          className={clsx(
            "h-12 px-7 bg-green-500 text-white font-medium rounded-full",
            "transition-all duration-150 active:scale-95"
          )}
        >
          Looks good to me!
        </button>
        <button
          className={clsx(
            "h-12 px-7 bg-red-500 text-white font-medium rounded-full",
            "transition-all duration-150 active:scale-95"
          )}
        >
          Could use some work.
        </button>
      </div>
    </div>
  );
}
