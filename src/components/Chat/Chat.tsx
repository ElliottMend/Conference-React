import React from "react";
import { IState } from "./ChatContainer";
interface IProps {
  state: IState[];
  addText: (e: any) => void;
  onChange: (e: any) => void;
  text: string;
}
export const Chat = (props: IProps) => {
  return (
    <div>
      <div className="h-64 overflow-scroll">
        {props.state.map((e, index) => (
          <div key={index} className="border-2 w-full bg-gray-100 flex">
            <p className="p-2">{e.user}: </p>
            <p className="p-2">{e.message}</p>
            <p className="p-2">{e.timestamp}</p>
            <br />
          </div>
        ))}
      </div>

      <br />
      <form onSubmit={props.addText}>
        <input
          className="border-2"
          value={props.text}
          onChange={props.onChange}
          size={100}
        />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );
};
