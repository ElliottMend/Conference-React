import React, { useEffect } from "react";
import { Chat } from "./Chat";
export const ChatSocket = () => {
  let ws = new WebSocket("ws://127.0.0.1:8000/chat/lbb/");
  return (
    <div>
      <Chat socket={ws} />
    </div>
  );
};
