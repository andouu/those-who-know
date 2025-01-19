"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { FormEvent, useState } from "react";

export default function Feedback() {
  const game = useGame()!;

  const handleSubmitNextQuestion = async () => {
    game.actions.submitNextQuestion();
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl mb-12">
        <span className="font-semibold">
          {game.state.otherPlayer!.username}&apos;s
        </span>{" "}
        Feedback.
      </span>
      <div className="flex items-center gap-5">
        <div className="flex flex-col">
          <div className="ml-1 mb-1 flex flex-col">
            <span className="font-medium leading-3">Your Response</span>
            <span>{game.state.otherPlayer!.prompts.at(-1)!}</span>
          </div>
          <textarea
            className={clsx(
              "w-96 h-36 px-3 py-2 rounded-xl border-2 border-neutral-200 font-medium mb-3 resize-none",
              "focus:border-purple-600 focus:outline-none focus:border-2"
            )}
            value={game.state.player.responses.at(-1)!}
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
            value={game.state.otherPlayer!.feedback.at(-1)!}
            readOnly
          />
        </div>
      </div>
      <button
        className={clsx(
          "w-72 h-12 mt-10 rounded-full bg-neutral-900 text-center text-white font-medium",
          "transition-all duration-150 active:scale-95"
        )}
        onClick={handleSubmitNextQuestion}
      >
        Next Question
      </button>
      {game.state.otherPlayer!.nextQuestionSubmitted ? (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} is ready.
        </span>
      ) : (
        <span className="text-neutral-300 mt-5 font-medium">
          {game.state.otherPlayer!.username} is reading your feedback...
        </span>
      )}
    </div>
  );
}
