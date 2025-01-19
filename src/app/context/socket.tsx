import { createContext, useContext, useRef } from "react";
import { io, Socket } from "socket.io-client";

export type SocketState = {
  socket: Socket | null;
  actions: {
    createRoom: (username: string) => Promise<void>;
    joinRoom: (roomCode: string, username: string) => Promise<void>;
  };
};

const SocketContext = createContext<SocketState>({
  socket: null,
  actions: { createRoom: async () => {}, joinRoom: async () => {} },
});

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
  const socket = useRef<Socket | null>(io("http://localhost:5678"));

  const createRoom = async (username: string) => {
    socket.current?.emit("createRoom", { username }, console.log);
  };

  const joinRoom = async (roomCode: string, username: string) => {
    socket.current?.emit("joinRoom", { roomCode, username }, console.log);
  };

  const actions: SocketState["actions"] = { createRoom, joinRoom };

  return (
    <SocketContext.Provider value={{ socket: socket.current, actions }}>
      {children}
    </SocketContext.Provider>
  );
};
