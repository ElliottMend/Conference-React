import React from "react";
import { Chat } from "./Chat";
import { io } from "socket.io-client";

export const socket = io("http://localhost:5000", {
  withCredentials: true,
});
const ChatSocket = () => {
  return (
    <div>
      <Chat />
    </div>
  );
};
export default ChatSocket;
