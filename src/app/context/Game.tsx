import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";

export type Game = {
  isAdmin: boolean;
  roomCode: string;
  stage: "LOBBY" | "PROMPT" | "RESPONSE" | "ADVISING" | "FEEDBACK" | "SUMMARY";
  roundsPlayed: number;
  topic: string;
  topicAgreed: boolean;
  canPlayAgain: boolean;
  player: {
    username: string;
    selfPrompts: string[];
    otherPrompts: string[];
    responses: string[];
    feedback: { text: string; good: boolean }[];
    summary: string;
  };
  otherPlayerUsername: string | null;
};

const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const value = useContext(GameContext);
  return value;
};

const EXAMPLE_GAME: Game = {
  isAdmin: true,
  roomCode: "AB912K",
  stage: "LOBBY",
  roundsPlayed: 0,
  topic: "Sports",
  topicAgreed: false,
  canPlayAgain: false,
  player: {
    username: "andou",
    selfPrompts: [],
    otherPrompts: [],
    responses: [],
    feedback: [],
    summary: "",
  },
  otherPlayerUsername: null,
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket();
  const [game] = useState<Game | null>(EXAMPLE_GAME);

  useEffect(() => {}, [socket]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
