"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { FormEvent, useState } from "react";

export default function Response() {
  const [response, setResponse] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitResponse = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || response.length === 0) {
      return;
    }

    try {
      setSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      game.actions.submitResponse(response);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = !submitting && response.length > 0;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="font-medium mb-2 text-neutral-400">
        Answer your prompt!
      </span>
      <span className="text-2xl mb-5">
        {game.state.player.otherPrompts.at(-1)!}
      </span>
      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmitResponse}
      >
        <textarea
          className={clsx(
            "w-96 h-36 px-3 py-2 rounded-xl border-2 border-neutral-200 font-medium mb-3 resize-none",
            "focus:border-purple-600 focus:outline-none focus:border-2 transition-colors duration-150 disabled:opacity-75 disabled:pointer-events-none"
          )}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          readOnly={submitting}
          disabled={submitting}
          placeholder="Answer here..."
        />
        <button
          className={clsx(
            "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          disabled={!canSubmit}
        >
          Submit
        </button>
      </form>
      {game.state.otherPlayer!.responseSubmitted ? (
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
}
