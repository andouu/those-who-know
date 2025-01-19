"use client";
import { GameProvider } from "../context/Game";
import { SocketProvider } from "../context/Socket";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <GameProvider>{children}</GameProvider>
    </SocketProvider>
  );
};
