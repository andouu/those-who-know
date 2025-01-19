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

const EXAMPLE_GAME: Game = {
  state: {
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
  },
  actions: {
    createRoom: async (username: string) => {
      console.log("createRoom", username);
    },
    joinRoom: async (roomCode: string) => {
      console.log("joinRoom", roomCode);
    },
    submitTopic: async (topic: string) => {
      console.log("submitTopic", topic);
    },
    agreeTopic: async () => {
      console.log("agreeTopic");
    },
    startPrompt: async () => {
      console.log("startPrompt");
    },
    submitPrompt: async (prompt: string) => {
      console.log("submitPrompt", prompt);
    },
    submitResponse: async (response: string) => {
      console.log("submitResponse", response);
    },
    submitFeedback: async (advice: string) => {
      console.log("submitFeedback", advice);
    },
    submitNextQuestion: async () => {
      console.log("submitNextQuestion");
    },
    submitSummary: async () => {
      console.log("submitSummary");
    },
    submitPlayAgain: async () => {
      console.log("submitPlayAgain");
    },
    getGameState: async () => {
      console.log("getGameState");
      return EXAMPLE_GAME.state;
    },
  },
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const socket = useSocket();
  const [game] = useState<Game | null>(EXAMPLE_GAME);

  // Fetch initial game state
  useEffect(() => {}, [socket]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};
