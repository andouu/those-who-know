"use client";
import { permanentRedirect, usePathname } from "next/navigation";
import { useGame } from "../../context/Game";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const game = useGame();
  const pathname = usePathname();

  if (!game) {
    permanentRedirect("/");
  }

  let href;
  switch (game.state.stage) {
    case "LOBBY":
      href = "/play/lobby";
      break;
    case "PROMPT":
      href = "/play/prompt";
      break;
    case "RESPONSE":
      href = "/play/response";
      break;
    case "ADVISING":
      href = "/play/advising";
      break;
    case "SUMMARY":
      href = "/play/summary";
      break;
    default:
      href = "/";
  }

  if (href && pathname !== href) {
    permanentRedirect(href);
  }

  return <div className="w-full h-screen">{children}</div>;
}
