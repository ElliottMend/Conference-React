import React, { useEffect, useState } from "react";
import { socket } from "./ChatSocket";
interface IText {
  message: String;
  user: String;
}
export const Chat = () => {
  const [state, setState] = useState<IText[]>([]);
  const [text, setText] = useState("");
  const addData = (data: IText) => {
    setState((prevState) => [...prevState, data]);
  };
  useEffect(() => {
    socket.on("join", (data: any) => {
      addData(data);
    });

    socket.on("message", (data: any) => {
      addData(data);
    });
    socket.emit("join", { room: "abc" });
  }, []);
  const addText = (e: any) => {
    e.preventDefault();
    socket.emit("message", text);
    setText("");
  };
  const onChange = (e: any) => {
    setText(e.target.value);
  };
  return (
    <div>
      <div className="h-64 overflow-scroll">
        {state.map((e) => (
          <div className="border-2 w-full bg-gray-100 flex">
            <p className="p-2">{e.user}: </p>
            <p className="p-2">{e.message}</p>
            <br />
          </div>
        ))}
      </div>

      <br />
      <form onSubmit={addText}>
        <input
          className="border-2"
          value={text}
          onChange={onChange}
          size={100}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
