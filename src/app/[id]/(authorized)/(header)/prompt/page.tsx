import clsx from "clsx";

export default function Prompt() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">
        Create a prompt for <span className="font-semibold">Yuchen</span>
      </span>
      <span className="text-sm text-neutral-300 mb-5 font-medium">
        The prompt should be relevant to the question topic.
      </span>
      <input
        className={clsx(
          "w-96 h-12 rounded-full border-2 border-neutral-200 text-center font-medium mb-3",
          "focus:border-purple-600 focus:outline-none focus:border-2"
        )}
        placeholder="e.g. Write a sentence about liking sports"
      />
      <button
        className={clsx(
          "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
          "transition-all duration-150 active:scale-95"
        )}
      >
        Continue
      </button>
      <span className="text-neutral-300 mt-5 font-medium">
        Yuchen has submitted.
      </span>
    </div>
  );
}
