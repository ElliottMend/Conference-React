import React, { useState } from "react";
import { axiosInstance } from "../../App";
interface IProps {
  onClose: () => void;
}
export const CreateRoomController = (props: IProps) => {
  const [text, setText] = useState({ room: "", password: "" });
  const textChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText({ ...text, [e.currentTarget.id]: e.currentTarget.value });
  };
  const createRoom = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await axiosInstance.post("/chat/create", {
      data: { room: text.room, password: text.password },
    });
    props.onClose();
  };
  return (
    <div>
      <form onSubmit={createRoom}>
        <input className="border-2" onChange={textChange} id="room" />
        <input className="border-2" onChange={textChange} id="password" />
        <button>Submit</button>
      </form>
    </div>
  );
};
