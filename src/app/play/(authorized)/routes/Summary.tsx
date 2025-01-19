"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { useState } from "react";
import { HiX } from "react-icons/hi";

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

const Modal = ({
  visible,
  closeModal,
}: {
  visible: boolean;
  closeModal: () => void;
}) => {
  const game = useGame()!;

  const zipped = [];
  for (let i = 0; i < game.state.player.responses.length; i++) {
    zipped.push([
      game.state.otherPlayer!.prompts[i],
      game.state.player.responses[i],
    ]);
  }

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 z-10 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-150",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <div className="w-4/5 h-3/5 bg-white rounded-xl drop-shadow-lg px-8 py-6">
        <div className="flex items-center justify-between">
          <span className="text-xl font-semibold mb-3">Your Responses</span>
          <button
            className="text-2xl active:scale-90 transition-all duration-150"
            onClick={closeModal}
          >
            <HiX />
          </button>
        </div>
        <div className="flex flex-col gap-5">
          {zipped.map(([p, r], i) => (
            <div key={i} className="flex flex-col">
              <span className="font-medium">{p}</span>
              <span>{r}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function Summary() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const game = useGame()!;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5">
      <Modal visible={showModal} closeModal={() => setShowModal(false)} />
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
      <button
        className="h-10 px-5 rounded-full border-2 border-neutral-100 text-sm font-medium text-neutral-400 transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
        onClick={() => setShowModal(true)}
      >
        See your responses
      </button>
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
