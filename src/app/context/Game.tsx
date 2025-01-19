"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./socket";

export type GameState = {
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

export type GameActions = {
  createRoom: (username: string) => Promise<void>;
  joinRoom: (roomCode: string) => Promise<void>;
  submitTopic: (topic: string) => Promise<void>;
  agreeTopic: () => Promise<void>;
  startPrompt: () => Promise<void>;
  submitPrompt: (prompt: string) => Promise<void>;
  submitResponse: (response: string) => Promise<void>;
  submitFeedback: (advice: string) => Promise<void>;
  submitNextQuestion: () => Promise<void>;
  submitSummary: () => Promise<void>;
  submitPlayAgain: () => Promise<void>;
  getGameState: () => Promise<GameState>;
};

export type Game = { state: GameState; actions: GameActions };

const GameContext = createContext<Game | null>(null);

export const useGame = () => {
  const value = useContext(GameContext);
  return value;
};

const EXAMPLE_GAME: GameState = {
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
  const [gameState, setGameState] = useState<GameState | null>(EXAMPLE_GAME);

  // Fetch initial game state
  useEffect(() => {}, [socket]);

  const createRoom = async (username: string) => {};

  const joinRoom = async (roomCode: string) => {};

  const agreeTopic = async () => {};

  const startPrompt = async () => {};

  const submitPrompt = async (prompt: string) => {};

  const submitResponse = async (response: string) => {};

  const submitFeedback = async (advice: string) => {};

  const submitNextQuestion = async () => {};

  const submitSummary = async () => {};

  const submitPlayAgain = async () => {};

  const submitTopic = async (topic: string) => {
    setGameState((prev) =>
      prev
        ? {
            ...prev,
            stage: "PROMPT",
            topic,
            topicAgreed: false,
          }
        : null
    );
  };

  const getGameState = async () => {
    return gameState!;
  };

  const actions: GameActions = {
    createRoom,
    joinRoom,
    agreeTopic,
    startPrompt,
    submitTopic,
    submitPrompt,
    submitResponse,
    submitFeedback,
    submitNextQuestion,
    submitSummary,
    submitPlayAgain,
    getGameState,
  };

  return (
    <GameContext.Provider
      value={gameState ? { state: gameState, actions } : null}
    >
      {children}
    </GameContext.Provider>
  );
};
