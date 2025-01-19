"use client";
import Lobby from "./routes/Lobby";
import Prompt from "./routes/Prompt";
import Response from "./routes/Response";
import Advising from "./routes/Advising";
import Summary from "./routes/Summary";
import { useGame } from "@/app/context/Game";

export default function Play() {
  const game = useGame()!;

  switch (game.state.stage) {
    case "LOBBY":
      return <Lobby />;
    case "PROMPT":
      return <Prompt />;
    case "RESPONSE":
      return <Response />;
    case "ADVISING":
      return <Advising />;
    case "SUMMARY":
      return <Summary />;
    default:
      return <div>404</div>;
  }
}
