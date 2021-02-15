import React, { useEffect } from "react";
import { Chat } from "./Chat";
import Cookies from "js-cookie";
export const ChatSocket = () => {
  console.log(Cookies.get());
  let ws = new WebSocket(`ws://127.0.0.1:8000/chat/lbb/`);

  return (
    <div>
      <Chat socket={ws} />
    </div>
  );
};
