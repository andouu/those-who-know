"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { FormEvent, useState } from "react";

const NewPrompt = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitPrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || prompt.length === 0) {
      return;
    }

    try {
      setSubmitting(true);
      game.actions.submitPrompt(prompt);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = !submitting && prompt.length > 0;

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
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmitPrompt}
      >
        <input
          className={clsx(
            "w-96 h-12 rounded-full border-2 border-neutral-200 text-center font-medium mb-3",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Write a sentence about liking sports"
        />
        <button
          type="submit"
          className={clsx(
            "w-96 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          disabled={!canSubmit}
        >
          Submit
        </button>
      </form>
      {game.state.otherPlayer!.promptSubmitted ? (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} has submitted.
        </span>
      ) : (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} is writing...
        </span>
      )}
    </div>
  );
};

const NarrowPrompt = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitPrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || prompt.length === 0) {
      return;
    }

    try {
      setSubmitting(true);
      game.actions.submitPrompt(prompt);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = !submitting && prompt.length > 0;

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
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmitPrompt}
      >
        <input
          className={clsx(
            "w-96 h-12 rounded-full border-2 border-neutral-200 text-center font-medium mb-3",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Write a sentence about liking sports"
        />
        <button
          type="submit"
          className={clsx(
            "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          disabled={!canSubmit}
        >
          Submit
        </button>
      </form>
      {game.state.otherPlayer!.promptSubmitted ? (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} has submitted.
        </span>
      ) : (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} is writing...
        </span>
      )}
      <div className="mt-10 flex flex-col items-center justify-center">
        <span className="font-medium mb-3">Past Prompts</span>
        {game.state.player.prompts
          .slice(-5)
          .toReversed()
          .map((prompt, i) => (
            <span key={i} className="text-neutral-400">
              {prompt}
            </span>
          ))}
      </div>
    </div>
  );
};

export default function Prompt() {
  const game = useGame()!;

  if (game.state.roundsPlayed > 1) {
    return <NarrowPrompt />;
  } else {
    return <NewPrompt />;
  }
}
