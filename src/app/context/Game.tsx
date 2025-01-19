import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";

type Game = {};

const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const value = useContext(GameContext);
  if (!value) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return value;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {}, [socket]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
