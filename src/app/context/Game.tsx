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
    prompts: [],
    responses: [],
    summary: "",
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
  const socket = useSocket();
  const [gameState, setGameState] = useState<GameState | null>(EXAMPLE_GAME);

  // Fetch initial game state
  useEffect(() => {}, [socket]);

  const createRoom = async (username: string) => {};

  const joinRoom = async (roomCode: string) => {};

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

  const agreeTopic = async () => {};

  const startPrompt = async () => {};

  const submitPrompt = async (prompt: string) => {
    setGameState((prev) =>
      prev
        ? {
            ...prev,
            stage: "RESPONSE",
            player: {
              ...prev.player,
              prompts: [...prev.player.prompts, prompt],
            },
            // BAD BAD BAD ONLY FOR TESTING
            otherPlayer: {
              ...prev.otherPlayer!,
              prompts: [...prev.otherPlayer!.prompts, prompt],
            },
          }
        : null
    );
  };

  const submitResponse = async (response: string) => {
    setGameState((prev) =>
      prev
        ? {
            ...prev,
            stage: "FEEDBACK",
            player: {
              ...prev.player,
              responses: [...prev.player.responses, response],
            },
          }
        : null
    );
  };

  const submitFeedback = async (advice: string) => {};

  const submitNextQuestion = async () => {
    setGameState((prev) =>
      prev
        ? { ...prev, stage: "PROMPT", roundsPlayed: prev.roundsPlayed + 1 }
        : null
    );
  };

  const submitSummary = async () => {};

  const submitPlayAgain = async () => {};

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
