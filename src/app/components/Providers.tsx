"use client";
import { GameProvider } from "../context/Game";
import { SocketProvider } from "../context/socket";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <GameProvider>{children}</GameProvider>
    </SocketProvider>
  );
};
