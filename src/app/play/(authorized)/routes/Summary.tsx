"use client";
import clsx from "clsx";

const Actions = ({ isAdmin }: { isAdmin: boolean }) => {
  if (isAdmin) {
    return (
      <>
        <div className="flex items-center gap-5">
          <button
            className={clsx(
              "w-48 h-12 bg-neutral-900 text-white font-medium rounded-full",
              "transition-all duration-150 active:scale-95"
            )}
          >
            End Game
          </button>
          <button
            className={clsx(
              "w-48 h-12 bg-neutral-900 text-white font-medium rounded-full",
              "transition-all duration-150 active:scale-95"
            )}
          >
            Play Again
          </button>
        </div>
        <span className="text-neutral-300 mt-3 font-medium">
          Yuchen wants to play again.
        </span>
      </>
    );
  } else {
    return (
      <div className="flex flex-col gap-5">
        <button
          className={clsx(
            "w-48 h-12 bg-neutral-900 text-white font-medium rounded-full",
            "transition-all duration-150 active:scale-95"
          )}
        >
          Play Again
        </button>
        <span className="text-neutral-300 mt-3 font-medium">
          andou has left the game.
        </span>
      </div>
    );
  }
};

export default function Summary() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <span className="text-2xl font-semibold mb-5">Game Summary</span>
      <div className="flex items-center gap-10 mb-3">
        <div className="flex flex-col items-center justify-center">
          <span className="font-medium text-lg">Question Topic</span>
          <span>Sports</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <span className="font-medium text-lg">Rounds Played</span>
          <span>3 Rounds</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mb-10">
        <span className="font-medium text-lg mb-2">Overview</span>
        <p className="whitespace-pre-line text-center max-w-prose leading-5">
          {
            "It seems like you struggled the most with vocab, so I would advise you to refresh your knowledge on commonly used words.\n\nHowever, you were a master of sentence structure. Good job!"
          }
        </p>
      </div>
      <Actions isAdmin={true} />
    </div>
  );
}
