import React, { useEffect, useState } from "react";
import { Chat } from "./Chat";
import { socket } from "../Homepage/HomepageContainer";
export interface IState {
  message: string;
  user: string;
  timestamp: string;
}

const ChatContainer = () => {
  const [state, setState] = useState<IState[]>([]);
  const [text, setText] = useState("");
  const addData = (data: IState) => {
    setState((prevState) => [...prevState, data]);
  };
  useEffect(() => {
    socket.on("join", (data: any) => {
      console.log(data);
      console.log("gfd");
      addData(data);
    });

    socket.on("message", (data: any) => {
      addData(data);
    });
    socket.emit("join", { room: "fsfds" });
  }, []);
  const addText = (e: any) => {
    e.preventDefault();
    socket.emit("message", { message: text });
    setText("");
  };
  const onChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <div>
      <Chat state={state} text={text} onChange={onChange} addText={addText} />
    </div>
  );
};
export default ChatContainer;
