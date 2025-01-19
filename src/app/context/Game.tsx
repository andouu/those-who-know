import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";

type Game = object;

const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const value = useContext(GameContext);
  return value;
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket();
  const [game] = useState<Game | null>(null);

  useEffect(() => {}, [socket]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
