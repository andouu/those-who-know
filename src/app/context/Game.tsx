"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSocket } from "./Socket";
import { useRouter } from "next/navigation";

export type GameState = {
  isAdmin: boolean;
  roomCode: string;
  stage: "LOBBY" | "PROMPT" | "RESPONSE" | "ADVISING" | "FEEDBACK" | "SUMMARY";
  roundsPlayed: number;
  topic: string;
  topicAgreed: boolean;
  canPlayAgain: boolean;
  canSummary: boolean;
  player: {
    username: string;
    prompts: string[]; // the prompts the player has written for the other player
    responses: string[]; // the player's responses to the other player's prompts
    summary: string;
  };
  otherPlayer: {
    username: string;
    promptSubmitted: boolean;
    responseSubmitted: boolean;
    feedbackSubmitted: boolean;
    nextQuestionSubmitted: boolean;
    playAgainSubmitted: boolean;
    prompts: string[]; // the other player's prompts to me
    responses: string[]; // the other player's responses to my prompts
    feedback: string[]; // the other player's feedback to my responses
  } | null;
};

export type GameActions = {
  submitTopic: (topic: string) => Promise<void>;
  agreeTopic: () => Promise<void>;
  startPrompt: () => Promise<void>;
  submitPrompt: (prompt: string) => Promise<void>;
  submitResponse: (response: string) => Promise<void>;
  submitFeedback: (advice: string, good: boolean) => Promise<void>;
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
  canSummary: false,
  player: {
    username: "andou",
    prompts: [],
    responses: [],
    summary:
      "It seems like you struggled the most with vocab, so I would advise you to refresh your knowledge on commonly used words.\n\nHowever, you were a master of sentence structure. Good job!",
  },
  otherPlayer: {
    username: "Yuchen",
    promptSubmitted: false,
    responseSubmitted: false,
    feedbackSubmitted: false,
    nextQuestionSubmitted: false,
    playAgainSubmitted: false,
    prompts: [],
    responses: [],
    feedback: [],
  },
};

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const { socket } = useSocket();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("updateGameState", (gameState) => {
      setGameState(gameState);
      router.replace("/play");
    });

    return () => {
      socket.off("updateGameState");
    };
  });

  const submitTopic = async (topic: string) => {
    socket?.emit("submitTopic", { topic }, console.log);
  };

  const agreeTopic = async () => {
    socket?.emit("agreeTopic", {}, console.log);
  };

  const startPrompt = async () => {
    socket?.emit("startPrompt", {}, console.log);
  };

  const submitPrompt = async (prompt: string) => {
    socket?.emit("submitPrompt", { prompt }, console.log);
  };

  const submitResponse = async (response: string) => {
    socket?.emit("submitResponse", { response }, console.log);
  };

  const submitFeedback = async (advice: string, good: boolean) => {
    socket?.emit("submitFeedback", { feedback: advice }, console.log);
  };

  const submitNextQuestion = async () => {
    socket?.emit("submitNextQuestion", {}, console.log);
  };

  const submitSummary = async () => {
    socket?.emit("submitSummary", {}, console.log);
  };

  const submitPlayAgain = async () => {
    socket?.emit("submitPlayAgain", {}, console.log);
  };

  const getGameState = async () => {
    return gameState!;
  };

  const actions: GameActions = {
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
