import React, { useState } from "react";
import { axiosInstance } from "../../App";
interface IProps {
  onClose: () => void;
}
export const CreateServerController = (props: IProps) => {
  const [text, setText] = useState({ server: "", password: "" });
  const textChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText({ ...text, [e.currentTarget.id]: e.currentTarget.value });
  };
  const createServer = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await axiosInstance.post("/server/create_server", {
      server: text.server,
      password: text.password,
    });
    props.onClose();
  };
  return (
    <div>
      <form onSubmit={createServer}>
        <input className="border-2" onChange={textChange} id="server" />
        <input className="border-2" onChange={textChange} id="password" />
        <button>Submit</button>
      </form>
    </div>
  );
};
