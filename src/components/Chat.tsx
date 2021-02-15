import React, { useEffect, useState } from "react";
interface IText {
  message: String;
}
interface ITextArray {
  [index: number]: { user: String; message: String };
}
interface IString {
  text: String;
}
interface IProp {
  socket: WebSocket;
}
export const Chat = (props: IProp) => {
  const [user, setUser] = useState("");
  const [state, setState] = useState<IText[]>([]);
  const [text, setText] = useState("");
  useEffect(() => {
    props.socket.onopen = () => {
      console.log("connected");
    };
    props.socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      setState((prevState) => [...prevState, { message: data.message }]);
      console.log(state);
    };
    props.socket.onclose = () => {
      console.log("disconnected");
    };
  }, []);

  const addText = (e: any) => {
    e.preventDefault();
    props.socket.send(JSON.stringify({ user: user, message: text }));
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
