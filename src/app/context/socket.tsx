import { createContext, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
  const value = useContext(SocketContext);
  if (!value) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return value;
};

export const SocketProvider = ({
  children: children,
}: {
  children: React.ReactNode;
}) => {
  const socket = useRef<Socket | null>(io("http://localhost:8000"));

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
