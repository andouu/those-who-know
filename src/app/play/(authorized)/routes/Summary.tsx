"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { useState } from "react";

const Actions = ({ isAdmin }: { isAdmin: boolean }) => {
  const [playAgain, setPlayAgain] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitPlayAgain = async () => {
    try {
      setPlayAgain(true);
      game.actions.submitPlayAgain();
    } catch (err) {
      console.error(err);
    }
  };

  if (isAdmin) {
    return (
      <>
        <div className="flex items-center gap-5">
          <button
            className={clsx(
              "w-48 h-12 bg-neutral-900 text-white font-medium rounded-full",
              "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
            )}
            disabled={playAgain}
          >
            End Game
          </button>
          <button
            className={clsx(
              "w-48 h-12 bg-neutral-900 text-white font-medium rounded-full",
              "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
            )}
            disabled={playAgain}
            onClick={handleSubmitPlayAgain}
          >
            Play Again
          </button>
        </div>
        {game.state.otherPlayer!.playAgainSubmitted ? (
          <span className="text-neutral-300 mt-3 font-medium">
            {game.state.otherPlayer!.username} wants to play again.
          </span>
        ) : (
          <span className="text-neutral-300 mt-3 font-medium">
            {game.state.otherPlayer!.username} is thinking...
          </span>
        )}
      </>
    );
  } else {
    return (
      <div className="flex flex-col gap-5">
        <button
          className={clsx(
            "w-48 h-12 bg-neutral-900 text-white font-medium rounded-full",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          disabled={playAgain}
          onClick={handleSubmitPlayAgain}
        >
          Play Again
        </button>
        {game.state.otherPlayer!.playAgainSubmitted ? (
          <span className="text-neutral-300 mt-3 font-medium">
            {game.state.otherPlayer!.username} wants to play again.
          </span>
        ) : (
          <span className="text-neutral-300 mt-3 font-medium">
            {game.state.otherPlayer!.username} is thinking...
          </span>
        )}
      </div>
    );
  }
};

export default function Summary() {
  const game = useGame()!;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <span className="text-2xl font-semibold mb-5">Game Summary</span>
      <div className="flex items-center gap-10 mb-3">
        <div className="flex flex-col items-center justify-center">
          <span className="font-medium text-lg">Question Topic</span>
          <span>{game.state.topic}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="font-medium text-lg">Rounds Played</span>
          <span>
            {game.state.roundsPlayed}{" "}
            {game.state.roundsPlayed === 1 ? "Round" : "Rounds"}
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <span className="font-medium text-lg mb-2">Overview</span>
        <p className="whitespace-pre-line text-center max-w-prose leading-5">
          {game.state.player.summary}
        </p>
      </div>
      <Actions isAdmin={true} />
    </div>
  );
}
