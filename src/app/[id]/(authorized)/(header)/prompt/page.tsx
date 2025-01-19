import clsx from "clsx";

const NewPrompt = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">
        Create a prompt for <span className="font-semibold">Yuchen</span>
      </span>
      <span className="text text-neutral-400 mb-5 font-medium">
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
        Submit
      </button>
      <span className="text-neutral-300 mt-5 font-medium">
        Yuchen has submitted.
      </span>
    </div>
  );
};

const NarrowPrompt = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">
        Narrow <span className="font-semibold">Yuchen's</span> prompt!
      </span>
      <span className="text-neutral-400 mb-5 font-medium">
        See your past prompts below.
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
        Submit
      </button>
      <span className="text-neutral-300 mt-5 font-medium">
        Yuchen is writing...
      </span>
      <div className="mt-10 flex flex-col items-center justify-center">
        <span className="font-medium mb-3">Past Prompts</span>
        <span className="text-neutral-400">
          Write a sentence about why basketball is your favorite sport
        </span>
        <span className="text-neutral-400">
          Write a sentence about a sport you like
        </span>
        <span className="text-neutral-400">Write a sentence about sports</span>
        <span className="text-neutral-400 mt-3">3 more...</span>
      </div>
    </div>
  );
};

export default function Prompt() {
  if (true) {
    return <NarrowPrompt />;
  } else {
    return <NewPrompt />;
  }
}
