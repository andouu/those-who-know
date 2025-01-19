"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { useState } from "react";

export default function Advising() {
  const [feedback, setFeedback] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitFeedback = async (good: boolean) => {
    console.log("BRUH");
    try {
      setSubmitting(true);
      game.actions.submitFeedback(feedback, good);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = feedback.length > 0 && !submitting;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl mb-12">
        Rate{" "}
        <span className="font-semibold">
          {game.state.otherPlayer!.username}&apos;s
        </span>{" "}
        Answer.
      </span>
      <div className="flex items-center gap-5">
        <div className="flex flex-col">
          <div className="ml-1 mb-1 flex flex-col">
            <span className="font-medium leading-3">Prompt</span>
            <span>{game.state.player.prompts.at(-1)!}</span>
          </div>
          <textarea
            className={clsx(
              "w-96 h-36 px-3 py-2 rounded-xl border-2 border-neutral-200 font-medium mb-3 resize-none",
              "focus:border-purple-600 focus:outline-none focus:border-2"
            )}
            value={game.state.otherPlayer!.responses.at(-1)!}
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
              "focus:border-purple-600 focus:outline-none focus:border-2 transition-colors duration-150 disabled:opacity-75 disabled:pointer-events-none"
            )}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            disabled={submitting}
            readOnly={submitting}
            placeholder="e.g. Good sentence structure, but incorrect vocab."
          />
        </div>
      </div>
      <div className="flex items-center gap-5 mt-5">
        <button
          className={clsx(
            "h-12 px-7 bg-green-500 text-white font-medium rounded-full",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          onClick={() => handleSubmitFeedback(true)}
          disabled={!canSubmit}
        >
          Looks good to me!
        </button>
        <button
          className={clsx(
            "h-12 px-7 bg-red-500 text-white font-medium rounded-full",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          onClick={() => handleSubmitFeedback(false)}
          disabled={!canSubmit}
        >
          Could use some work.
        </button>
      </div>
    </div>
  );
}
