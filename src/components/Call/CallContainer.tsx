import React, { useState, useEffect } from "react";
import { socket } from "../WebSockets";
import Peer from "simple-peer";
import { Call } from "./Call";
interface IProps {
  serverId: string;
}
export const CallContainer = (props: IProps) => {
  const [videos, setVideos] = useState<MediaStream[]>([]);
  const [users, setUsers] = useState<Peer.Instance[]>([]);
  const user = new Peer({ initiator: true });
  const user1 = new Peer();
  useEffect(() => {
    socket.emit("join_call", { server: props.serverId });
    socket.on("users_in_call", (user: number[]) => {
      let arr = [];
      for (let i = 0; i < user.length; i++) {
        let a = new Peer();
        arr.push(a);
      }
      setUsers(arr);
    });
  }, []);
  useEffect(() => {
    user.on("signal", (data) => {
      user1.signal(data);
      // users.forEach((user) => {
      //   user.signal(data);
      // });
    });
    user1.on("signal", (data) => {
      user.signal(data);
    });
    user1.on("stream", (stream) => {
      setVideos([...videos, stream]);
    });
  }, []);

  return <Call user={user} videos={videos} />;
};
