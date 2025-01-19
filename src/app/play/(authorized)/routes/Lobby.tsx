"use client";
import { useGame } from "@/app/context/Game";
import clsx from "clsx";
import { FormEvent, useState } from "react";

const AdminLobby = () => {
  const [topic, setTopic] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const game = useGame()!;

  const handleSubmitTopic = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting || topic.length === 0) {
      return;
    }

    try {
      setSubmitting(true);
      game.actions.submitTopic(topic);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  console.log(game.state.otherPlayer);

  const canSubmit =
    !submitting && topic.length > 0 && game.state.otherPlayer?.username;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">Question Topic</span>
      <span className="text-neutral-400 mb-5 font-medium">
        The topic should be relevant to what you&apos;re studying
      </span>
      <form
        className="flex flex-col justify-center"
        onSubmit={handleSubmitTopic}
      >
        <input
          className={clsx(
            "w-72 h-12 rounded-full border-2 border-neutral-200 text-center font-medium mb-3",
            "focus:border-purple-600 focus:outline-none focus:border-2"
          )}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g. Sports"
        />
        <button
          type="submit"
          className={clsx(
            "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
            "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
          )}
          disabled={!canSubmit}
        >
          Continue
        </button>
      </form>
      {game.state.otherPlayer ? (
        game.state.topicAgreed ? (
          <span className="text-neutral-300 mt-5 font-medium">
            {game.state.otherPlayer.username} agrees.
          </span>
        ) : (
          <span className="text-neutral-300 mt-5 font-medium">
            {game.state.otherPlayer.username} is thinking...
          </span>
        )
      ) : null}
    </div>
  );
};

const PlayerLobby = () => {
  const game = useGame()!;

  const handleAgreeTopic = async () => {
    try {
      await game.actions.agreeTopic();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span className="text-xl font-semibold mb-1">Question Topic</span>
      <span className="text-neutral-400 mb-5 font-medium">
        The topic should be relevant to what you&apos;re studying
      </span>
      <input
        className={clsx(
          "w-72 h-12 rounded-full border-2 border-neutral-200 text-center font-medium mb-3",
          "focus:border-purple-600 focus:outline-none focus:border-2"
        )}
        value={game.state.topic}
        readOnly
        placeholder={`${game.state.otherPlayer!.username} is writing...`}
      />
      <button
        type="submit"
        className={clsx(
          "w-72 h-12 rounded-full bg-neutral-900 text-center text-white font-medium",
          "transition-all duration-150 active:scale-95 disabled:opacity-35 disabled:pointer-events-none"
        )}
        onClick={handleAgreeTopic}
        disabled={!game.state.topic}
      >
        Click to agree
      </button>
      {game.state.otherPlayer ? (
        game.state.topicAgreed ? (
          <span className="text-neutral-300 mt-5 font-medium">
            {game.state.otherPlayer.username} agrees.
          </span>
        ) : (
          <span className="text-neutral-300 mt-5 font-medium">
            {game.state.otherPlayer.username} is thinking...
          </span>
        )
      ) : null}
    </div>
  );
};

export default function Lobby() {
  const game = useGame()!;

  if (game.state.isAdmin) {
    return <AdminLobby />;
  } else {
    return <PlayerLobby />;
  }
}
