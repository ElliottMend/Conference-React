import React, { useState, useEffect } from "react";
import axios from "axios";

export const Sidebar = () => {
  const [rooms, setRooms] = useState([]);
  const [text, setText] = useState({ room: "", password: "" });
  useEffect(() => {
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/chat/getrooms",
    }).then((res) => {
      console.log(res.data);
      setRooms(res.data);
    });
  }, []);

  const textChange = (e: any) => {
    setText({ ...text, [e.currentTarget.id]: e.currentTarget.value });
  };
  const createRoom = (e: any) => {
    e.preventDefault();
    console.log(text);
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/chat/create",
      data: { room: text.room, password: text.password },
    });
  };
  return (
    <div>
      <form onSubmit={createRoom}>
        <input className="border-2" onChange={textChange} id="room" />
        <input className="border-2" onChange={textChange} id="password" />
        <button>Submit</button>
      </form>
      <p>Rooms:</p>
      {rooms.map((e, index) => (
        <ul key={index}>
          <li>{e}</li>
        </ul>
      ))}
    </div>
  );
};
