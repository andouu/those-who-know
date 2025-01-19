"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";

const NewPrompt = () => {
  const game = useGame()!;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">
        Create a prompt for{" "}
        <span className="font-semibold">
          {game.state.otherPlayer!.username}
        </span>
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
      {game.state.otherPlayer!.promptSubmitted ? (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} is writing...
        </span>
      ) : (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} has submitted.
        </span>
      )}
    </div>
  );
};

const NarrowPrompt = () => {
  const game = useGame()!;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">
        Narrow{" "}
        <span className="font-semibold">
          {game.state.otherPlayer!.username}&apos;s
        </span>{" "}
        prompt!
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
        {game.state.otherPlayer!.username} is writing...
      </span>
      <div className="mt-10 flex flex-col items-center justify-center">
        <span className="font-medium mb-3">Past Prompts</span>
        {game.state.player.selfPrompts.map((prompt) => (
          <span className="text-neutral-400">{prompt}</span>
        ))}
      </div>
    </div>
  );
};

export default function Prompt() {
  const game = useGame()!;

  if (game.state.roundsPlayed > 0) {
    return <NarrowPrompt />;
  } else {
    return <NewPrompt />;
  }
}
