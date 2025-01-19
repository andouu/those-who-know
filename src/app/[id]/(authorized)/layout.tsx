"use client";
import { permanentRedirect } from "next/navigation";
import { useGame } from "../../context/Game";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const game = useGame();

  if (!game) {
    // permanentRedirect("/");
  }

  return <div className="w-full h-screen">{children}</div>;
}
