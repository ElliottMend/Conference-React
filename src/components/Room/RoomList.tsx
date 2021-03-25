import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../App";
import { Link } from "react-router-dom";
import { AxiosResponse } from "axios";
export const RoomList = () => {
  const [rooms, setRooms] = useState<string[]>([]);

  useEffect(() => {
    axiosInstance.get("/chat/getrooms").then((res: AxiosResponse<string[]>) => {
      setRooms(res.data);
    });
  }, []);
  return (
    <div>
      {rooms.map((roomName, index) => (
        <ul key={index}>
          <Link to={{ pathname: "/chat", state: { room: roomName } }}>
            <li>{roomName}</li>
          </Link>
        </ul>
      ))}
    </div>
  );
};
