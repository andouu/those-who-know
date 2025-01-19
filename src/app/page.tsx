import clsx from "clsx";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <span className="font-bold mb-3 text-xl">THOSE WHO KNOW</span>
      <input
        className={clsx(
          "w-64 h-12 rounded-full border-2 border-neutral-200 text-center font-medium",
          "focus:border-purple-600 focus:outline-none focus:border-2"
        )}
        placeholder="Room Code"
      />
      <span className="font-medium text-sm text-neutral-300">OR</span>
      <button className="w-64 h-12 rounded-full bg-neutral-900 text-white font-medium">
        Create Room
      </button>
    </div>
  );
}
