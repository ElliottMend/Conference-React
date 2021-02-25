import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { ws } from "./ChatSocket";
interface IText {
  message: String;
}
interface ITextArray {
  [index: number]: { user: String; message: String };
}
interface IString {
  text: String;
}
interface IProp {}
export const Chat = (props: IProp) => {
  const [user, setUser] = useState("");
  const [state, setState] = useState<IText[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    ws.on("join", (data: any) => {
      console.log(data);
      setState([...state, data]);
    });
    ws.emit("join", "gdfgdf");
  }, []);
  const addText = (e: any) => {
    e.preventDefault();
    ws.send(JSON.stringify({ user: user, message: text }));
  };
  const onChange = (e: any) => {
    setText(e.target.value);
  };
  const changeUser = (e: any) => {
    setUser(e.target.value);
  };
  return (
    <div>
      <div className="h-64 overflow-scroll">
        {state.map((e) => (
          <div className="border-2 w-full bg-gray-100 flex">
            <p className="p-2">{e.message}</p>
            <br />
          </div>
        ))}
      </div>

      <br />
      <form onSubmit={addText}>
        <input className="border-2" onChange={onChange} size={100} />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
