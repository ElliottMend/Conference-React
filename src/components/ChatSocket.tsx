import React, { useEffect } from "react";
import { Chat } from "./Chat";
import { io } from "socket.io-client";
export const ws = io("http://0.0.0.0:5000", {
  withCredentials: true,
  transports: ["websocket"],
});
export const ChatSocket = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
