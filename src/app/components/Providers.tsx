import { SocketProvider } from "../context/socket";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SocketProvider>{children}</SocketProvider>;
};
