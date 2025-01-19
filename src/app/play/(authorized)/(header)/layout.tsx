"use client";
import { useGame } from "@/app/context/Game";
import { useSelectedLayoutSegment } from "next/navigation";

const Header = () => {
  const path = useSelectedLayoutSegment();
  const game = useGame()!;

  let centerComponent;
  switch (path) {
    case "lobby":
      centerComponent = game.state.otherPlayerUsername ? (
        <span>
          <span className="font-semibold">
            {game.state.otherPlayerUsername}
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
          <span className="font-semibold">{"Sports"}</span>
        </span>
      );
  }

  return (
    <div className="w-full h-16 flex items-center px-5 border-b-2 border-neutral-100">
      <span className="flex-1">
        You&apos;re <span className="font-semibold">andou</span>
      </span>
      <span className="flex-1 text-center">{centerComponent}</span>
      <span className="flex-1 text-end">
        Room <span className="font-semibold">AB912K</span>
      </span>
    </div>
  );
};

export default function HeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
}
