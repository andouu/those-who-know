import { permanentRedirect } from "next/navigation";
import { useGame } from "../context/Game";

export const ProtectedLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const game = useGame();

  if (!game) {
    permanentRedirect("/");
  }

  return <div>{children}</div>;
};
