"use client";
import { permanentRedirect } from "next/navigation";
import { useGame } from "../../context/Game";
import clsx from "clsx";

const Header = () => {
  const game = useGame()!;

  let centerComponent;
  switch (game.state.stage) {
    case "SUMMARY":
      centerComponent = null;
      break;
    case "LOBBY":
      centerComponent = game.state.otherPlayer ? (
        <span>
          <span className="font-semibold">
            {game.state.otherPlayer.username}
          </span>{" "}
          has joined
        </span>
      ) : (
        <span className="text-neutral-400 font-medium">
          Waiting for another player...
        </span>
      );
      break;
    default:
      centerComponent = (
        <span>
          The question topic is{" "}
          <span className="font-semibold">{game.state.topic}</span>
        </span>
      );
  }

  return (
    <div className="w-full h-16 flex items-center px-5 border-b-2 border-neutral-100">
      <span className="flex-1">
        You&apos;re{" "}
        <span className="font-semibold">{game.state.player.username}</span>
      </span>
      <span className="flex-1 text-center">{centerComponent}</span>
      <span className="flex-1 text-end">
        Room <span className="font-semibold">{game.state.roomCode}</span>
      </span>
    </div>
  );
};

const SummaryButton = () => {
  const game = useGame()!;

  if (game.state.stage === "SUMMARY" || !game.state.isAdmin) {
    return null;
  }

  return (
    <button
      className={clsx(
        "fixed bottom-5 right-5 px-5 h-11 flex items-center justify-center bg-neutral-900 rounded-full text-sm text-white font-medium",
        "transition-all duration-150 active:scale-95",
        !game.state.canSummary && "hidden"
      )}
      onClick={game.actions.submitSummary}
    >
      End Game & See Summary
    </button>
  );
};

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const game = useGame();

  if (!game) {
    permanentRedirect("/");
  }

  return (
    <div className="w-full h-screen flex flex-col">
      <Header />
      <SummaryButton />
      {children}
    </div>
  );
}
