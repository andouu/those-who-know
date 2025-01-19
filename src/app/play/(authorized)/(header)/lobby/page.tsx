"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { FormEvent, useState } from "react";

export default function Lobby() {
  const [topic, setTopic] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitTopic = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || topic.length === 0) {
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      game.actions.submitTopic(topic);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = !submitting && topic.length > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">Question Topic</span>
      <span className="text-neutral-400 mb-5 font-medium">
        The topic should be relevant to what you&apos;re studying
      </span>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmitTopic}
      >
        <input
          className={clsx(
            "w-72 h-12 rounded-full border-2 border-neutral-200 text-center font-medium mb-3",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Sports"
        />
        <button
          type="submit"
          className={clsx(
            "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          disabled={!canSubmit}
        >
          Continue
        </button>
      </form>
      {game.state.topicAgreed ? (
        <span className="text-neutral-300 mt-5 font-medium">
          Yuchen agrees.
        </span>
      ) : (
        <span className="text-neutral-300 mt-5 font-medium">
          Yuchen is thinking...
        </span>
      )}
    </div>
  );
}
